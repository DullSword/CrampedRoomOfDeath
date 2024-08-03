import { _decorator, Animation, AnimationState } from 'cc';
const { ccclass } = _decorator;

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { EntityManager } from '../../Base/EntityManager';

import { PlayerIdleSubStateMachine } from './PlayerIdleSubStateMachine';
import { PlayerTurnLeftSubStateMachine } from './PlayerTurnLeftSubStateMachine';
import { PlayerTurnRightSubStateMachine } from './PlayerTurnRightSubStateMachine';

import { PlayerBlockedFrontSubStateMachine } from './PlayerBlockedFrontSubStateMachine';
import { PlayerBlockedBackSubStateMachine } from './PlayerBlockedBackSubStateMachine';
import { PlayerBlockedTurnLeftSubStateMachine } from './PlayerBlockedTurnLeftSubStateMachine';
import { PlayerBlockedTurnRightSubStateMachine } from './PlayerBlockedTurnRightSubStateMachine';

import { PlayerAttackSubStateMachine } from './PlayerAttackSubStateMachine';
import { PlayerDeadSubStateMachine } from './PlayerDeadSubStateMachine';
import { PlayerFallingDeadSubStateMachine } from './PlayerFallingDeadSubStateMachine';

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
        this.params.set(EEntityStateMachineParams.BlockedBack, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.BlockedTurnLeft, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.BlockedTurnRight, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Attack, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Death, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.FallingDeath, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new PlayerIdleSubStateMachine(this);
        const TurnLeftState = new PlayerTurnLeftSubStateMachine(this);
        const TurnRightState = new PlayerTurnRightSubStateMachine(this);

        const BlockedFrontState = new PlayerBlockedFrontSubStateMachine(this);
        const BlockedBackState = new PlayerBlockedBackSubStateMachine(this);
        const BlockedTurnLeftState = new PlayerBlockedTurnLeftSubStateMachine(this);
        const BlockedTurnRightState = new PlayerBlockedTurnRightSubStateMachine(this);

        const AttackState = new PlayerAttackSubStateMachine(this);
        const DeadState = new PlayerDeadSubStateMachine(this);
        const FallingDeadState = new PlayerFallingDeadSubStateMachine(this);

        await Promise.all([
            IdleState.init(),
            TurnLeftState.init(),
            TurnRightState.init(),

            BlockedFrontState.init(),
            BlockedBackState.init(),
            BlockedTurnLeftState.init(),
            BlockedTurnRightState.init(),

            AttackState.init(),
            DeadState.init(),
            FallingDeadState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.TurnLeft, TurnLeftState);
        this.states.set(EEntityState.TurnRight, TurnRightState);

        this.states.set(EEntityState.BlockedFront, BlockedFrontState);
        this.states.set(EEntityState.BlockedBack, BlockedBackState);
        this.states.set(EEntityState.BlockedTurnLeft, BlockedTurnLeftState);
        this.states.set(EEntityState.BlockedTurnRight, BlockedTurnRightState);

        this.states.set(EEntityState.Attack, AttackState);
        this.states.set(EEntityState.Death, DeadState);
        this.states.set(EEntityState.FallingDeath, FallingDeadState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['turn', 'block', 'attack'];
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
                } else if (this.getParamValue(EEntityStateMachineParams.TurnRight)) {
                    this.currentState = this.states.get(EEntityState.TurnRight);
                } else if (this.getParamValue(EEntityStateMachineParams.BlockedFront)) {
                    this.currentState = this.states.get(EEntityState.BlockedFront);
                } else if (this.getParamValue(EEntityStateMachineParams.BlockedBack)) {
                    this.currentState = this.states.get(EEntityState.BlockedBack);
                } else if (this.getParamValue(EEntityStateMachineParams.BlockedTurnLeft)) {
                    this.currentState = this.states.get(EEntityState.BlockedTurnLeft);
                } else if (this.getParamValue(EEntityStateMachineParams.BlockedTurnRight)) {
                    this.currentState = this.states.get(EEntityState.BlockedTurnRight);
                } else if (this.getParamValue(EEntityStateMachineParams.Attack)) {
                    this.currentState = this.states.get(EEntityState.Attack);
                } else if (this.getParamValue(EEntityStateMachineParams.Death)) {
                    this.currentState = this.states.get(EEntityState.Death);
                } else if (this.getParamValue(EEntityStateMachineParams.FallingDeath)) {
                    this.currentState = this.states.get(EEntityState.FallingDeath);
                } else {
                    this.currentState = this.currentState;
                }
                break;
            case this.states.get(EEntityState.TurnLeft):
            case this.states.get(EEntityState.TurnRight):
            case this.states.get(EEntityState.BlockedFront):
            case this.states.get(EEntityState.BlockedBack):
            case this.states.get(EEntityState.BlockedTurnLeft):
            case this.states.get(EEntityState.BlockedTurnRight):
            case this.states.get(EEntityState.Attack):
                if (this.getParamValue(EEntityStateMachineParams.Idle)) {
                    this.currentState = this.states.get(EEntityState.Idle);
                } else if (this.getParamValue(EEntityStateMachineParams.Death)) {
                    this.currentState = this.states.get(EEntityState.Death);
                } else if (this.getParamValue(EEntityStateMachineParams.FallingDeath)) {
                    this.currentState = this.states.get(EEntityState.FallingDeath);
                }
                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
