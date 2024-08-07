import { _decorator, Animation } from 'cc';

import { EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { State } from '../../Base/State';
import { numberToWord } from '../../Utils';
import { TrapManager } from './TrapManager';

export abstract class TrapStateMachine extends StateMachine {

    protected trapManager: TrapManager = null;
    protected totalPoint: number = 0;
    protected baseUrl: string = '';

    async init(params: { trapManager?: TrapManager, totalPoint?: number, baseUrl?: string } = {}) {
        const { trapManager, totalPoint = 0, baseUrl = '' } = params;

        this.trapManager = trapManager;
        this.totalPoint = totalPoint;
        this.baseUrl = baseUrl;

        this.animationComponent = this.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    abstract initAnimationEvent(): void;

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
