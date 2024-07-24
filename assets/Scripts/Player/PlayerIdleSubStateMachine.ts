
import { AnimationClip } from "cc";
import { SubStateMachine } from "../../Base/SubStateMachine";
import { EPlayerDirection, EPlayerStateMachineParams } from "../../Enums";
import { State } from "../../Base/State";
import { StateMachine } from "../../Base/StateMachine";

const baseUrl = 'texture/player/idle';

export class PlayerIdleSubStateMachine extends SubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm);
    }

    async init() {
        const topState = new State(`${baseUrl}/top`, this.fsm, AnimationClip.WrapMode.Loop);
        const bottomState = new State(`${baseUrl}/bottom`, this.fsm, AnimationClip.WrapMode.Loop);
        const leftState = new State(`${baseUrl}/left`, this.fsm, AnimationClip.WrapMode.Loop);
        const rightState = new State(`${baseUrl}/right`, this.fsm, AnimationClip.WrapMode.Loop);

        await Promise.all([topState.init(), bottomState.init(), leftState.init(), rightState.init()]);

        this.states.set(EPlayerDirection.Top, topState);
        this.states.set(EPlayerDirection.Bottom, bottomState);
        this.states.set(EPlayerDirection.Left, leftState);
        this.states.set(EPlayerDirection.Right, rightState);
    }

    run() {
        const direction = this.fsm.getParamValue(EPlayerStateMachineParams.Direction);
        this.currentState = this.states.get(direction as EPlayerDirection);
    }
}