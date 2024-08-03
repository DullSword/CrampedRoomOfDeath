import { _decorator, Animation } from 'cc';
const { ccclass } = _decorator;

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';

import { DoorIdleSubStateMachine } from './DoorIdleSubStateMachine';
import { State } from '../../Base/State';

@ccclass('DoorStateMachine')
export class DoorStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Death, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new DoorIdleSubStateMachine(this);
        const DeadState = new State('texture/door/death', this);

        await Promise.all([
            IdleState.init(),
            DeadState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.Death, DeadState);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):
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
