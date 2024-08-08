
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/smoke/idle';

export class SmokeIdleSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine,sampleRate?: number) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal, sampleRate);
    }
}