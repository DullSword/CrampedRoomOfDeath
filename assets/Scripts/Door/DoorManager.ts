
import { EntityManager } from '../../Base/EntityManager';
import { EEntityState, EEntityType, EEvent } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { IEntity } from '../../Levels';
import { DoorStateMachine } from './DoorStateMachine';

export class DoorManager extends EntityManager {

    async init(params: IEntity) {
        await super.init({
            ...params,
            type: EEntityType.Door,
            fsm: DoorStateMachine,
        });

        this.setTileInfo(false, true);

        EventManager.instance.on(EEvent.OpenDoor, this.open, this);
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.OpenDoor, this.open, this);

        super.onDestroy();
    }

    open() {
        this.state = EEntityState.Death;

        this.setTileInfo(true, false);
    }
}
