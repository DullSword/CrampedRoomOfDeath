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

        if (!player || player.state === EEntityState.Death) {
            return;
        }

        this.currentPoint++;

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
