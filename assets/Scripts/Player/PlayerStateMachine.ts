import { _decorator, Animation, AnimationState } from 'cc';
const { ccclass } = _decorator;

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { PlayerIdleSubStateMachine } from './PlayerIdleSubStateMachine';
import { PlayerTurnLeftSubStateMachine } from './PlayerTurnLeftSubStateMachine';

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.TurnLeft, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new PlayerIdleSubStateMachine(this);
        const TurnLeftState = new PlayerTurnLeftSubStateMachine(this);

        await Promise.all([IdleState.init(), TurnLeftState.init()]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.TurnLeft, TurnLeftState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['turn'];
            if (whiteList.some((v) => state.name.includes(v))) {
                this.setParamValue(EEntityStateMachineParams.Idle, true);
            }
        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle): {
                if (this.getParamValue(EEntityStateMachineParams.TurnLeft)) {
                    this.currentState = this.states.get(EEntityState.TurnLeft);
                }
                break;
            }
            case this.states.get(EEntityState.TurnLeft): {
                if (this.getParamValue(EEntityStateMachineParams.Idle)) {
                    this.currentState = this.states.get(EEntityState.Idle);
                }
                break;
            }
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
