
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";
import { AnimationClip } from "cc";
import { State } from "../../Base/State";
import { EDirection } from "../../Enums";

const baseUrl = 'texture/player/attack';

export class PlayerAttackSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal);
    }

    async init() {
        const attackShakeFrameIndex = 4;

        const topState = new State(`${this.baseUrl}/top`, this.fsm, this.wrapMode, this.sampleRate, [{ frame: 1 / this.sampleRate * attackShakeFrameIndex, func: 'onAttackShake', params: [EDirection.Top] }]);
        const bottomState = new State(`${this.baseUrl}/bottom`, this.fsm, this.wrapMode, this.sampleRate, [{ frame: 1 / this.sampleRate * attackShakeFrameIndex, func: 'onAttackShake', params: [EDirection.Bottom] }]);
        const leftState = new State(`${this.baseUrl}/left`, this.fsm, this.wrapMode, this.sampleRate, [{ frame: 1 / this.sampleRate * attackShakeFrameIndex, func: 'onAttackShake', params: [EDirection.Left] }]);
        const rightState = new State(`${this.baseUrl}/right`, this.fsm, this.wrapMode, this.sampleRate, [{ frame: 1 / this.sampleRate * attackShakeFrameIndex, func: 'onAttackShake', params: [EDirection.Right] }]);

        await Promise.all([topState.init(), bottomState.init(), leftState.init(), rightState.init()]);

        this.states.set(EDirection.Top, topState);
        this.states.set(EDirection.Bottom, bottomState);
        this.states.set(EDirection.Left, leftState);
        this.states.set(EDirection.Right, rightState);
    }
}