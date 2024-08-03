import { UITransform, Vec2 } from 'cc';

import { TrapManager } from '../TrapManager';
import { ITrap } from '../../../Levels';
import { EEntityState, EEvent } from '../../../Enums';

import { TILE_WIDTH, TILE_HEIGHT } from '../../Tile/TileManager';

import DataManager from '../../../Runtime/DataManager';
import EventManager from '../../../Runtime/EventManager';

export class BurstManager extends TrapManager {

    async init(params: ITrap) {
        await super.init({
            ...params,
        });

        const UITransformComponent = this.getComponent(UITransform);
        UITransformComponent.setContentSize(TILE_WIDTH, TILE_HEIGHT);

        this.setTileInfo(true, false);
    }

    protected update(dt: number): void {
        this.node.setPosition(this.position.x * TILE_WIDTH, -this.position.y * TILE_HEIGHT);
    }

    trigger() {
        const player = DataManager.instance.player;

        if (
            (!player || player.state === EEntityState.Death) ||
            (this.state === EEntityState.Idle && Vec2.distance(this.position, player.targetPosition) > this.triggerDistance)
        ) {
            return;
        }

        switch (this.state) {
            case EEntityState.Idle:
                this.state = EEntityState.Attack;
                this.bIsTriggered = true;
                break;
            case EEntityState.Attack:
                this.state = EEntityState.Death;
                if (Vec2.distance(this.position, player.targetPosition) <= this.triggerDistance) {
                    EventManager.instance.emit(EEvent.FallingDeath, player, this);
                }
                this.setTileVisibility(false);
                this.setTileInfo(false, false);
                break;
            case EEntityState.Death:
                break;
            default:
                break;
        }
    }
}
