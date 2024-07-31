import { _decorator, Animation, AnimationState } from 'cc';
const { ccclass } = _decorator;

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../../Enums';
import { StateMachine } from '../../../Base/StateMachine';

import { WoodenSkeletonIdleSubStateMachine } from './WoodenSkeletonIdleSubStateMachine';

@ccclass('WoodenSkeletonStateMachine')
export class WoodenSkeletonStateMachine extends StateMachine {

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

    async initStates() {
        const IdleState = new WoodenSkeletonIdleSubStateMachine(this);

        await Promise.all([
            IdleState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {

        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):

                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
