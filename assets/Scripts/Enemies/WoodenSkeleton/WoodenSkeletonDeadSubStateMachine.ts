
import { EnemyDeadSubStateMachine } from "./EnemyDeadSubStateMachine";
import { StateMachine } from "../../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/woodenskeleton/death';

export class WoodenSkeletonDeadSubStateMachine extends EnemyDeadSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal);
    }
}