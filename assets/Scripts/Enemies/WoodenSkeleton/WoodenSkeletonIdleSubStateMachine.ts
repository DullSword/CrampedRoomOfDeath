
import { DirectionSubStateMachine } from "../../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/woodenskeleton/idle';

export class WoodenSkeletonIdleSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Loop);
    }
}