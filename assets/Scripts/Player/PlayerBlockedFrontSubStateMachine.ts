
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";

const baseUrl = 'texture/player/blockfront';

export class PlayerBlockedFrontSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl);
    }
}