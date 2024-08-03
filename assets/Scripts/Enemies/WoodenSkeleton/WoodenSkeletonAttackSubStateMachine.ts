
import { EnemyAttackSubStateMachine } from "../EnemyAttackSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/woodenskeleton/attack';

export class WoodenSkeletonAttackSubStateMachine extends EnemyAttackSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal);
    }
}