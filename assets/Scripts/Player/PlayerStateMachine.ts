import { _decorator, Component, Animation, AnimationClip, animation, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

import { EPlayerState, EStateMachineParamType } from '../../Enums';
import { State } from '../../Base/State';

export interface IStateMachineParams {
    type: EStateMachineParamType,
    value: animation.Value_experimental
}

@ccclass('PlayerStateMachine')
export class PlayerStateMachine extends Component {

    private _currentState: State = null;

    params: Map<string, IStateMachineParams> = new Map();
    states: Map<EPlayerState, State> = new Map();

    animationComponent: Animation;

    async init() {
        this.animationComponent = this.node.addComponent(Animation);

        this.initParams();
        await this.initStates();
    }

    initParams() {
        this.params.set(EPlayerState.Idle, { type: EStateMachineParamType.TRIGGER, value: false });
        this.params.set(EPlayerState.TurnLeft, { type: EStateMachineParamType.TRIGGER, value: false });
    }

    async initStates() {
        const IdleState = new State('texture/player/idle/top', this, AnimationClip.WrapMode.Loop);
        const TurnLeftState = new State('texture/player/turnleft/top', this);

        await Promise.all([IdleState.init(), TurnLeftState.init()]);

        this.states.set(EPlayerState.Idle, IdleState);
        this.states.set(EPlayerState.TurnLeft, TurnLeftState);
    }

    getParamValue(paramName: string) {
        return this.params.get(paramName)?.value;
    }

    setParamValue(paramName: string, value: animation.Value_experimental) {
        if (this.params.has(paramName)) {
            this.params.get(paramName).value = value;
            this.run();
        }
    }

    get currentState() {
        return this._currentState;
    }

    set currentState(newState: State) {
        this._currentState = newState;
        this._currentState.run();
    }

    run() {
        switch (this.currentState) {
            case this.states.get(EPlayerState.Idle): {
                if (this.getParamValue(EPlayerState.TurnLeft)) {
                    this.currentState = this.states.get(EPlayerState.TurnLeft);
                }
                break;
            }
            case this.states.get(EPlayerState.TurnLeft): {
                break;
            }
            default: {
                this.currentState = this.states.get(EPlayerState.Idle);
            }
        }
    }
}


