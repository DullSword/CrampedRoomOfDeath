import { _decorator } from 'cc';
const { ccclass } = _decorator;

import { EnemyStateMachine } from './EnemyStateMachine';
import { EEntityState } from '../../../Enums';
import { WoodenSkeletonIdleSubStateMachine } from './WoodenSkeletonIdleSubStateMachine';
import { WoodenSkeletonAttackSubStateMachine } from './WoodenSkeletonAttackSubStateMachine';
import { WoodenSkeletonDeadSubStateMachine } from './WoodenSkeletonDeadSubStateMachine';

@ccclass('WoodenSkeletonStateMachine')
export class WoodenSkeletonStateMachine extends EnemyStateMachine {

    async init() {
        await super.init();
    }

    async initStates() {
        const IdleState = new WoodenSkeletonIdleSubStateMachine(this);
        const AttackState = new WoodenSkeletonAttackSubStateMachine(this);
        const DeadState = new WoodenSkeletonDeadSubStateMachine(this);

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
