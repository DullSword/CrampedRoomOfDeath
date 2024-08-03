import { _decorator } from 'cc';

import { EEntityState } from '../../../Enums';
import { State } from '../../../Base/State';
import { TrapStateMachine } from '../TrapStateMachine';

export class BurstStateMachine extends TrapStateMachine {

    async init() {
        await super.init();
    }

    async initStates() {
        const IdleState = new State('texture/burst/idle', this);
        const AttackState = new State('texture/burst/attack', this);
        const DeadState = new State('texture/burst/death', this);

        await Promise.all([
            IdleState.init(),
            AttackState.init(),
            DeadState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.Attack, AttackState);
        this.states.set(EEntityState.Death, DeadState);
    }
}
