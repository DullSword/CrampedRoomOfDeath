
import { DirectionSubStateMachine } from "../../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

export class EnemyIdleSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine, baseUrl: string, wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal) {
        super(fsm, baseUrl, wrapMode);
    }
}