import { Animation, AnimationState } from 'cc';

import { EEntityState, EEntityStateMachineParams, EStateMachineParamType } from '../../Enums';
import { StateMachine } from '../../Base/StateMachine';
import { EntityManager } from '../../Base/EntityManager';

export abstract class EnemyStateMachine extends StateMachine {

    async init() {
        this.animationComponent = this.addComponent(Animation);
        this.initAnimationEvent();

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EEntityStateMachineParams.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Attack, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Death, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EEntityStateMachineParams.Direction, { type: EStateMachineParamType.INTEGER, value: 0 });
    }

    protected abstract initStates(): Promise<void>;

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const whiteList = ['attack'];
            if (whiteList.some((v) => state.name.includes(v))) {
                this.node.getComponent(EntityManager).state = EEntityState.Idle;
            }
        }, this);
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EEntityState.Idle):
                if (this.getParamValue(EEntityStateMachineParams.Attack)) {
                    this.currentState = this.states.get(EEntityState.Attack);
                } else if (this.getParamValue(EEntityStateMachineParams.Death)) {
                    this.currentState = this.states.get(EEntityState.Death);
                } else {
                    // 通过此方式触发 state 重新判断朝向
                    this.currentState = this.currentState;
                }

                break;
            default: {
                this.currentState = this.states.get(EEntityState.Idle);
            }
        }
    }
}
