
import { EnemyDeadSubStateMachine } from "../EnemyDeadSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/ironskeleton/death';

export class IronSkeletonDeadSubStateMachine extends EnemyDeadSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal);
    }
}