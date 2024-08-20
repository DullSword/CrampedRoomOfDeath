import { Vec2 } from 'cc';

import { TrapManager } from '../TrapManager';
import { ITrap } from '../../../Levels';
import { EEntityState, EEvent } from '../../../Enums';

import DataManager from '../../../Runtime/DataManager';
import EventManager from '../../../Runtime/EventManager';

export class SpikeManager extends TrapManager {

    async init(params: ITrap) {
        await super.init({
            ...params,
        });

        this.setTileInfo(true, false);

        EventManager.instance.on(EEvent.ResetTrapPoint, this.resetPoint, this);
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.ResetTrapPoint, this.resetPoint, this);

        super.onDestroy();
    }

    trigger() {
        const player = DataManager.instance.player;

        if (!player) {
            return;
        }

        // 正常应该在播放完最后一段动画后触发达 resetPoint，使 currentPoint 重置为 0，
        // 但动画还没播放完时如果人物又进行移动执行到这里，那么就将 currentPoint 直接设置为 1
        if (this.currentPoint === this.totalPoint) {
            this.currentPoint = 1;
        } else {
            this.currentPoint++;
        }

        if (this.currentPoint === this.totalPoint) {
            if (Vec2.distance(this.position, player.targetPosition) <= this.triggerDistance) {
                EventManager.instance.emit(EEvent.Death, player, this);
            }
        }
    }

    resetPoint(trapManager: TrapManager) {
        if (this === trapManager) {
            this.currentPoint = 0;
        }
    }
}
