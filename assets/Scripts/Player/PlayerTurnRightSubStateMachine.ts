
import { DirectionSubStateMachine } from "../../Base/DirectionSubStateMachine";
import { StateMachine } from "../../Base/StateMachine";

const baseUrl = 'texture/player/turnright';

export class PlayerTurnRightSubStateMachine extends DirectionSubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm, baseUrl);
    }
}