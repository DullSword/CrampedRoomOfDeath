
import { SubStateMachine } from "../../Base/SubStateMachine";
import { EPlayerDirection, EPlayerStateMachineParams } from "../../Enums";
import { State } from "../../Base/State";
import { StateMachine } from "../../Base/StateMachine";

const baseUrl = 'texture/player/turnleft';

export class PlayerTurnLeftSubStateMachine extends SubStateMachine {

    constructor(fsm: StateMachine) {
        super(fsm);
    }

    async init() {
        const topState = new State(`${baseUrl}/top`, this.fsm);
        const bottomState = new State(`${baseUrl}/bottom`, this.fsm);
        const leftState = new State(`${baseUrl}/left`, this.fsm);
        const rightState = new State(`${baseUrl}/right`, this.fsm);

        await Promise.all([topState.init(), bottomState.init(), leftState.init(), rightState.init()]);

        this.states.set(EPlayerDirection.Top, topState);
        this.states.set(EPlayerDirection.Bottom, bottomState);
        this.states.set(EPlayerDirection.Left, leftState);
        this.states.set(EPlayerDirection.Right, rightState);
    }

    run() {
        const direction = this.fsm.getParamValue(EPlayerStateMachineParams.Direction);
        this.currentState = this.states.get(direction as EPlayerDirection);
    }
}