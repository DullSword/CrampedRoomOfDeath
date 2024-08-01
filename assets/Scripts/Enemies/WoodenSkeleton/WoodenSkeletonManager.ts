import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EnemyManager } from './EnemyManager';
import { EDirection, EEntityState, EEntityType } from '../../../Enums';
import { WoodenSkeletonStateMachine } from './WoodenSkeletonStateMachine';

@ccclass('WoodenSkeletonManager')
export class WoodenSkeletonManager extends EnemyManager {

    async init() {
        await super.init({
            type: EEntityType.Enemy,
            position: new Vec2(2, 4),
            fsm: WoodenSkeletonStateMachine,
            direction: EDirection.Top,
            state: EEntityState.Idle,
        });
    }
}
