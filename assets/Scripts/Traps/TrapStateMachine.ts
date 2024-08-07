import { _decorator, Animation } from 'cc';

import { EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { State } from '../../Base/State';
import { numberToWord } from '../../Utils';

export abstract class TrapStateMachine extends StateMachine {

    protected totalPoint: number = 0;
    protected baseUrl: string = '';

    async init(params: { totalPoint?: number, baseUrl?: string } = {}) {
        const { totalPoint = 0, baseUrl = '' } = params;

        this.totalPoint = totalPoint;
        this.baseUrl = baseUrl;

        this.animationComponent = this.addComponent(Animation);

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.CurrentPoint, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const stateInstances = Array.from({ length: this.totalPoint + 1 }, (_, i) => {
            const state = new State(`${this.baseUrl}/${numberToWord[i]}`, this);
            return state;
        });

        await Promise.all(stateInstances.map(state => state.init()));

        stateInstances.forEach((state, i) => this.states.set(i, state));
    }

    run() {
        const currentPoint = this.getParamValue(EEntityStateMachineParams.CurrentPoint);
        this.currentState = this.states.get(currentPoint as number);
    }
}
