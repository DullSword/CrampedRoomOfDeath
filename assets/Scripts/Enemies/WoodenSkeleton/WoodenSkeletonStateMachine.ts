import { _decorator } from 'cc';
const { ccclass } = _decorator;

import { EnemyStateMachine } from './EnemyStateMachine';

import { WoodenSkeletonIdleSubStateMachine } from './WoodenSkeletonIdleSubStateMachine';
import { EEntityState } from '../../../Enums';

@ccclass('WoodenSkeletonStateMachine')
export class WoodenSkeletonStateMachine extends EnemyStateMachine {

    async init() {
        await super.init();
    }

    async initStates() {
        const IdleState = new WoodenSkeletonIdleSubStateMachine(this);

        await Promise.all([
            IdleState.init(),
        ]);

        this.states.set(EEntityState.Idle, IdleState);
    }
}
