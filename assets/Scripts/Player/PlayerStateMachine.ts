import { _decorator, Animation, AnimationState } from 'cc';
const { ccclass } = _decorator;

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { EntityManager } from '../../Base/EntityManager';

import { PlayerIdleSubStateMachine } from './PlayerIdleSubStateMachine';
import { PlayerTurnLeftSubStateMachine } from './PlayerTurnLeftSubStateMachine';
import { PlayerTurnRightSubStateMachine } from './PlayerTurnRightSubStateMachine';

import { PlayerBlockedFrontSubStateMachine } from './PlayerBlockedFrontSubStateMachine';
import { PlayerBlockedTurnLeftSubStateMachine } from './PlayerBlockedTurnLeftSubStateMachine';
import { PlayerBlockedTurnRightSubStateMachine } from './PlayerBlockedTurnRightSubStateMachine';

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
        this.params.set(EEntityStateMachineParams.TurnRight, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.BlockedFront, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.BlockedTurnLeft, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.BlockedTurnRight, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new PlayerIdleSubStateMachine(this);
        const TurnLeftState = new PlayerTurnLeftSubStateMachine(this);
        const TurnRightState = new PlayerTurnRightSubStateMachine(this);

        const BlockedFrontState = new PlayerBlockedFrontSubStateMachine(this);
        const BlockedTurnLeftState = new PlayerBlockedTurnLeftSubStateMachine(this);
        const BlockedTurnRightState = new PlayerBlockedTurnRightSubStateMachine(this);

        await Promise.all([
            IdleState.init(),
            TurnLeftState.init(),
            TurnRightState.init(),

            BlockedFrontState.init(),
            BlockedTurnLeftState.init(),
            BlockedTurnRightState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.TurnLeft, TurnLeftState);
        this.states.set(EEntityState.TurnRight, TurnRightState);

        this.states.set(EEntityState.BlockedFront, BlockedFrontState);
        this.states.set(EEntityState.BlockedTurnLeft, BlockedTurnLeftState);
        this.states.set(EEntityState.BlockedTurnRight, BlockedTurnRightState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['turn', 'block'];
            if (whiteList.some((v) => state.name.includes(v))) {
                this.node.getComponent(EntityManager).state = EEntityState.Idle;
            }
        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):
                if (this.getParamValue(EEntityStateMachineParams.TurnLeft)) {
                    this.currentState = this.states.get(EEntityState.TurnLeft);
                }
                if (this.getParamValue(EEntityStateMachineParams.TurnRight)) {
                    this.currentState = this.states.get(EEntityState.TurnRight);
                }
                if (this.getParamValue(EEntityStateMachineParams.BlockedFront)) {
                    this.currentState = this.states.get(EEntityState.BlockedFront);
                }
                if (this.getParamValue(EEntityStateMachineParams.BlockedTurnLeft)) {
                    this.currentState = this.states.get(EEntityState.BlockedTurnLeft);
                }
                if (this.getParamValue(EEntityStateMachineParams.BlockedTurnRight)) {
                    this.currentState = this.states.get(EEntityState.BlockedTurnRight);
                }
                break;
            case this.states.get(EEntityState.TurnLeft):
            case this.states.get(EEntityState.TurnRight):
            case this.states.get(EEntityState.BlockedFront):
            case this.states.get(EEntityState.BlockedTurnLeft):
            case this.states.get(EEntityState.BlockedTurnRight):
                if (this.getParamValue(EEntityStateMachineParams.Idle)) {
                    this.currentState = this.states.get(EEntityState.Idle);
                }
                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
