
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";
import { AnimationClip } from "cc";

const baseUrl = 'texture/player/attack';

export class PlayerAttackSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl, AnimationClip.WrapMode.Normal);
    }
}