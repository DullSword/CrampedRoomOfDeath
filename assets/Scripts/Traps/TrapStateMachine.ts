import { _decorator, Animation } from 'cc';

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';

export abstract class TrapStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Attack, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Death, { type: EStateMachineParamType.TRIGGER, value: false });
    }

    protected abstract initStates(): Promise<void>;

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):
                if (this.getParamValue(EEntityStateMachineParams.Attack)) {
                    this.currentState = this.states.get(EEntityState.Attack);
                } else if (this.getParamValue(EEntityStateMachineParams.Death)) {
                    this.currentState = this.states.get(EEntityState.Death);
                } else {
                    this.currentState = this.currentState;
                }
                break;
            case this.states.get(EEntityState.Attack):
                if (this.getParamValue(EEntityStateMachineParams.Death)) {
                    this.currentState = this.states.get(EEntityState.Death);
                } else {
                    this.currentState = this.currentState;
                }
                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
