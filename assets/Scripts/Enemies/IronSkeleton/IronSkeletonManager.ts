import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { EnemyManager } from '../EnemyManager';
import { IEnemy } from '../../../Levels';

@ccclass('IronSkeletonManager')
export class IronSkeletonManager extends EnemyManager {

    async init(params: IEnemy) {
        await super.init(params);
    }

    tryAttackPlayer() {
        // do nothing
    }
}
