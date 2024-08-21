
import { EntityManager } from '../../Base/EntityManager';
import { EDirection, EEnemyType, EEntityState, EEntityType, EEvent } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import DataManager from '../../Runtime/DataManager';
import { IEnemy } from '../../Levels';

export abstract class EnemyManager extends EntityManager {

    protected enemyType: EEnemyType = null;

    async init(params: IEnemy) {
        await super.init({
            ...params,
            type: EEntityType.Enemy,
        });

        this.enemyType = params.enemyType;

        EventManager.instance.on(EEvent.playerSpawned, this.adjustDirection, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.adjustDirection, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.tryAttackPlayer, this);

        this.adjustDirection();
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.playerSpawned, this.adjustDirection, this);
        EventManager.instance.off(EEvent.PlayerMoveEnd, this.adjustDirection, this);
        EventManager.instance.off(EEvent.PlayerMoveEnd, this.tryAttackPlayer, this);

        super.onDestroy();
    }

    adjustDirection() {
        const player = DataManager.instance.player;
        if (this.state === EEntityState.Death || this.state === EEntityState.FallingDeath || !player || player.state === EEntityState.Death) {
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

    tryAttackPlayer() {
        const player = DataManager.instance.player;
        if (this.state === EEntityState.Death || this.state === EEntityState.FallingDeath || !player || player.state === EEntityState.Death) {
            return;
        }

        super.tryAttackTarget(player, 1);
    }

    protected OnDeath(target: EntityManager, Instigator: EntityManager): void {
        if (target === this && this.state !== EEntityState.Death) {
            super.OnDeath(target, Instigator);

            const bNoEnemySurvived = DataManager.instance.enemies.every(enemy => enemy.state === EEntityState.Death);
            if (bNoEnemySurvived) {
                EventManager.instance.emit(EEvent.OpenDoor);
            }
        }
    }
}
