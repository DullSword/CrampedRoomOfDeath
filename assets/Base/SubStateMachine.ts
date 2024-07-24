
import { EPlayerDirection } from '../Enums';
import { State } from './State';
import { StateMachine } from './StateMachine';

export abstract class SubStateMachine {

    private _currentState: State = null;

    states: Map<EPlayerDirection, State> = new Map();

    get currentState() {
        return this._currentState;
    }

    set currentState(newState: State) {
        this._currentState = newState;
        this._currentState.run();
    }

    constructor(protected fsm: StateMachine) {
    }

    abstract init(): void;
    abstract run(): void;
}
