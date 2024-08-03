import { _decorator, Component, Animation, animation } from 'cc';

import { EEntityState, EStateMachineParamType } from '../Enums';
import { State } from './State';
import { SubStateMachine } from './SubStateMachine';

export interface IStateMachineParams {
    type: EStateMachineParamType,
    value: animation.Value_experimental
}

export abstract class StateMachine extends Component {

    private _currentState: State | SubStateMachine = null;

    params: Map<string, IStateMachineParams> = new Map();
    states: Map<EEntityState, State | SubStateMachine> = new Map();

    animationComponent: Animation;

    getParamValue(paramName: string) {
        return this.params.get(paramName)?.value;
    }

    setParamValue(paramName: string, value: animation.Value_experimental) {
        if (this.params.has(paramName)) {
            this.params.get(paramName).value = value;
            this.run();

            this.resetTrigger();
        }
    }

    resetTrigger() {
        for (const [_, v] of this.params) {
            if (v.type === EStateMachineParamType.TRIGGER) {
                v.value = false;
            }
        }
    }

    get currentState() {
        return this._currentState;
    }

    set currentState(newState: State | SubStateMachine) {
        this._currentState = newState;
        this._currentState?.run();
    }

    abstract init(): void;
    abstract run(): void;
}
