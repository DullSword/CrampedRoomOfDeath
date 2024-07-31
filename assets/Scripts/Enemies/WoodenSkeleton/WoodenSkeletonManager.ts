import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EntityManager } from '../../../Base/EntityManager';
import { EDirection, EEntityState, EEntityType } from '../../../Enums';
import { WoodenSkeletonStateMachine } from './WoodenSkeletonStateMachine';

@ccclass('WoodenSkeletonManager')
export class WoodenSkeletonManager extends EntityManager {

    async init() {
        await super.init({
            type: EEntityType.Player,
            position: new Vec2(7, 7),
            fsm: WoodenSkeletonStateMachine,
            direction: EDirection.Top,
            state: EEntityState.Idle,
        });
    }
}
