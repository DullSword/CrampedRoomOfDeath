
import { EnemyIdleSubStateMachine } from "./EnemyIdleSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/woodenskeleton/idle';

export class WoodenSkeletonIdleSubStateMachine extends EnemyIdleSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Loop);
    }
}