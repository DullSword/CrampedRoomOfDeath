import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { EnemyManager } from '../EnemyManager';
import { IEntity } from '../../../Levels';

@ccclass('IronSkeletonManager')
export class IronSkeletonManager extends EnemyManager {

    async init(params: IEntity) {
        await super.init(params);
    }

    tryAttackPlayer() {
        // do nothing
    }
}
