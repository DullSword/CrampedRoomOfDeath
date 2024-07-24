import { _decorator, Animation, AnimationState } from 'cc';
const { ccclass } = _decorator;

import { EPlayerState, EPlayerStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { PlayerIdleSubStateMachine } from './PlayerIdleSubStateMachine';
import { PlayerTurnLeftSubStateMachine } from './PlayerTurnLeftSubStateMachine';

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.node.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EPlayerStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EPlayerStateMachineParams.TurnLeft, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EPlayerStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new PlayerIdleSubStateMachine(this);
        const TurnLeftState = new PlayerTurnLeftSubStateMachine(this);

        await Promise.all([IdleState.init(), TurnLeftState.init()]);

        this.states.set(EPlayerState.Idle, IdleState);
        this.states.set(EPlayerState.TurnLeft, TurnLeftState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['turn'];
            if (whiteList.some((v) => state.name.includes(v))) {
                this.setParamValue(EPlayerStateMachineParams.Idle, true);
            }
        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EPlayerState.Idle): {
                if (this.getParamValue(EPlayerStateMachineParams.TurnLeft)) {
                    this.currentState = this.states.get(EPlayerState.TurnLeft);
                }
                break;
            }
            case this.states.get(EPlayerState.TurnLeft): {
                if (this.getParamValue(EPlayerStateMachineParams.Idle)) {
                    this.currentState = this.states.get(EPlayerState.Idle);
                }
                break;
            }
            default: {
                this.currentState = this.states.get(EPlayerState.Idle);
            }
        }
    }
}
