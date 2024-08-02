import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { EnemyManager } from './EnemyManager';
import { IEntity } from '../../../Levels';

@ccclass('WoodenSkeletonManager')
export class WoodenSkeletonManager extends EnemyManager {

    async init(params: IEntity) {
        await super.init(params);
    }
}
