import { Animation, AnimationState } from 'cc';

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../../Enums';
import { StateMachine } from '../../../Base/StateMachine';

export abstract class EnemyStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });

        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    protected abstract initStates(): Promise<void>;

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {

        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):
                this.currentState = this.currentState;
                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
