import { _decorator } from 'cc';
const { ccclass } = _decorator;

import { EnemyStateMachine } from '../EnemyStateMachine';
import { EEntityState } from '../../../Enums';
import { IronSkeletonIdleSubStateMachine } from './IronSkeletonIdleSubStateMachine';
import { IronSkeletonDeadSubStateMachine } from './IronSkeletonDeadSubStateMachine';

@ccclass('IronSkeletonStateMachine')
export class IronSkeletonStateMachine extends EnemyStateMachine {

    async init() {
        await super.init();
    }

    async initStates() {
        const IdleState = new IronSkeletonIdleSubStateMachine(this);
        const DeadState = new IronSkeletonDeadSubStateMachine(this);

        await Promise.all([
            IdleState.init(),
            DeadState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
        this.states.set(EEntityState.Death, DeadState);
    }
}
