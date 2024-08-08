import { Animation, AnimationState } from 'cc';

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { EntityManager } from '../../Base/EntityManager';
import { SmokeIdleSubStateMachine } from './SmokeIdleSubStateMachine';
import { State } from '../../Base/State';

export class SmokeStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Death, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    async initStates() {
        const IdleState = new SmokeIdleSubStateMachine(this, 16);
        const DeadState = new State('texture/smoke/death', this);

        await Promise.all([
            IdleState.init(),
            DeadState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.Death, DeadState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['idle'];
            if (whiteList.some((v) => state.name.includes(v))) {
                this.node.getComponent(EntityManager).state = EEntityState.Death;
            }
        }, this);
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
