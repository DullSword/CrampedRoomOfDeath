
import { EnemyIdleSubStateMachine } from "../EnemyIdleSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/ironskeleton/idle';

export class IronSkeletonIdleSubStateMachine extends EnemyIdleSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Loop);
    }
}