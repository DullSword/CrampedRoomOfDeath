
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";

const baseUrl = 'texture/player/blockturnleft';

export class PlayerBlockedTurnLeftSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl);
    }
}