
import { EntityManager } from '../../Base/EntityManager';
import { EEntityType, EEvent, ETrapType } from '../../Enums';
import { ITrap } from '../../Levels';
import EventManager from '../../Runtime/EventManager';

export abstract class TrapManager extends EntityManager {

    protected bIsTriggered: boolean = false;
    protected trapType: ETrapType = null;
    protected triggerDistance: number = 0;

    async init(params: ITrap) {
        await super.init({
            ...params,
            type: EEntityType.Trap,
        });

        this.trapType = params.trapType;
        this.triggerDistance = params.triggerDistance ?? 0;

        EventManager.instance.on(EEvent.playerActionCompleted, this.trigger, this);
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.playerActionCompleted, this.trigger, this);

        super.onDestroy();
    }

    protected abstract trigger(): void;
}
