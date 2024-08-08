
import { AnimationClip } from "cc";
import { SubStateMachine } from "./SubStateMachine";
import { EDirection, EEntityStateMachineParams } from "../Enums";
import { State } from "./State";
import { StateMachine } from "./StateMachine";

export class DirectionSubStateMachine extends SubStateMachine {

    constructor(fsm: StateMachine, baseUrl: string, wrapMode?: AnimationClip.WrapMode, sampleRate?: number) {
        super(fsm, baseUrl, wrapMode, sampleRate);
    }

    async init() {
        const topState = new State(`${this.baseUrl}/top`, this.fsm, this.wrapMode, this.sampleRate);
        const bottomState = new State(`${this.baseUrl}/bottom`, this.fsm, this.wrapMode, this.sampleRate);
        const leftState = new State(`${this.baseUrl}/left`, this.fsm, this.wrapMode, this.sampleRate);
        const rightState = new State(`${this.baseUrl}/right`, this.fsm, this.wrapMode, this.sampleRate);

        await Promise.all([topState.init(), bottomState.init(), leftState.init(), rightState.init()]);

        this.states.set(EDirection.Top, topState);
        this.states.set(EDirection.Bottom, bottomState);
        this.states.set(EDirection.Left, leftState);
        this.states.set(EDirection.Right, rightState);
    }

    run() {
        const direction = this.fsm.getParamValue(EEntityStateMachineParams.Direction);
        this.currentState = this.states.get(direction as EDirection);
    }
}