import { Vec2 } from 'cc';

import { EntityManager } from '../../../Base/EntityManager';
import { EDirection, EEntityState, EEvent } from '../../../Enums';
import EventManager from '../../../Runtime/EventManager';
import DataManager from '../../../Runtime/DataManager';
import { IEntity } from '../../../Levels';

export abstract class EnemyManager extends EntityManager {

    async init(params: IEntity) {
        await super.init({
            type: params.type,
            position: params.position,
            fsm: params.fsm,
            direction: params.direction,
            state: params.state,
        });

        EventManager.instance.on(EEvent.playerSpawned, this.adjustDirection, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.adjustDirection, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.tryAttackTarget, this);

        this.adjustDirection();
    }

    adjustDirection() {
        if (!DataManager.instance.player) {
            return;
        }

        const { position: playerPosition } = DataManager.instance.player;

        const DistX = Math.abs(playerPosition.x - this.position.x);
        const DistY = Math.abs(playerPosition.y - this.position.y);

        const firstQuadrant = playerPosition.x >= this.position.x && playerPosition.y <= this.position.y;
        const secondQuadrant = playerPosition.x <= this.position.x && playerPosition.y <= this.position.y;
        const thirdQuadrant = playerPosition.x <= this.position.x && playerPosition.y >= this.position.y;
        const fourthQuadrant = playerPosition.x >= this.position.x && playerPosition.y >= this.position.y;

        if (firstQuadrant) {
            this.direction = DistX < DistY ? EDirection.Top : EDirection.Right;
        } else if (secondQuadrant) {
            this.direction = DistX < DistY ? EDirection.Top : EDirection.Left;
        } else if (thirdQuadrant) {
            this.direction = DistX < DistY ? EDirection.Bottom : EDirection.Left;
        } else if (fourthQuadrant) {
            this.direction = DistX < DistY ? EDirection.Bottom : EDirection.Right;
        }
    }

    tryAttackTarget() {
        const { position: playerPosition } = DataManager.instance.player;

        if (Vec2.distance(this.position, playerPosition) <= 1) {
            this.state = EEntityState.Attack;

            EventManager.instance.emit(EEvent.playerDeath, this);
        }
    }
}
