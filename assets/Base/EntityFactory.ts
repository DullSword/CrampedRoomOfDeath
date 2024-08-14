import { Node, Size } from 'cc';

import { IEnemy, IEntity, ITrap } from '../Levels';
import { EEnemyType, ETrapType } from '../Enums';
import { CreateUINode } from '../Utils';
import { EntityManager } from './EntityManager';
import { StateMachine } from './StateMachine';

import { PlayerManager } from '../Scripts/Player/PlayerManager';

import { EnemyManager } from '../Scripts/Enemies/EnemyManager';
import { WoodenSkeletonManager } from '../Scripts/Enemies/WoodenSkeleton/WoodenSkeletonManager';
import { WoodenSkeletonStateMachine } from '../Scripts/Enemies/WoodenSkeleton/WoodenSkeletonStateMachine';
import { IronSkeletonManager } from '../Scripts/Enemies/IronSkeleton/IronSkeletonManager';
import { IronSkeletonStateMachine } from '../Scripts/Enemies/IronSkeleton/IronSkeletonStateMachine';

import { DoorManager } from '../Scripts/Door/DoorManager';

import { TrapManager } from '../Scripts/Traps/TrapManager';
import { BurstManager } from '../Scripts/Traps/Burst/BurstManager';
import { BurstStateMachine } from '../Scripts/Traps/Burst/BurstStateMachine';
import { SpikeManager } from '../Scripts/Traps/Spike/SpikeManager';
import { SpikeStateMachine } from '../Scripts/Traps/Spike/SpikeStateMachine';
import { SmokeManager } from '../Scripts/Smoke/SmokeManager';

import { TILE_HEIGHT, TILE_WIDTH } from '../Scripts/Tile/TileManager';

export interface IEntityFactory {
    create(params: IEntity, parentNode: Node): Promise<EntityManager>;
}

export class PlayerFactory implements IEntityFactory {
    async create(params: IEntity, parentNode: Node) {
        const player = CreateUINode('player');
        player.setParent(parentNode);

        const playerManagerComponent = player.addComponent(PlayerManager);
        await playerManagerComponent.init({
            ...params
        });

        return playerManagerComponent;
    }
}

export class EnemyFactory implements IEntityFactory {
    async create(params: IEnemy, parentNode: Node) {
        const enemy = CreateUINode('enemy');
        enemy.setParent(parentNode);

        let enemyManagerComponent: EnemyManager;
        let stateMachine: new () => StateMachine;

        type EnemyConfig = {
            manager: new () => EnemyManager;
            stateMachine: new () => StateMachine;
        };

        const enemyConfig: Record<EEnemyType, EnemyConfig> = {
            [EEnemyType.WoodenSkeleton]: { manager: WoodenSkeletonManager, stateMachine: WoodenSkeletonStateMachine },
            [EEnemyType.IronSkeleton]: { manager: IronSkeletonManager, stateMachine: IronSkeletonStateMachine },
        };

        const config = enemyConfig[params.enemyType];
        if (config) {
            enemyManagerComponent = enemy.addComponent(config.manager);
            stateMachine = config.stateMachine;
        }

        await enemyManagerComponent.init({
            ...params,
            fsm: stateMachine,
        });

        return enemyManagerComponent;
    }
}

export class DoorFactory implements IEntityFactory {
    async create(params: IEntity, parentNode: Node) {
        const door = CreateUINode('door');
        door.setParent(parentNode);

        const doorManagerComponent = door.addComponent(DoorManager);
        await doorManagerComponent.init({
            ...params,
        });

        return doorManagerComponent;
    }
}

export class TrapFactory implements IEntityFactory {
    async create(params: ITrap, parentNode: Node) {
        const trap = CreateUINode('trap');
        trap.setParent(parentNode);

        let trapManagerComponent: TrapManager;
        let stateMachine: new () => StateMachine;

        type TrapConfig = {
            manager: new () => TrapManager;
            stateMachine: new () => StateMachine;
            totalPoint: number;
            tileSize?: Size;
        };

        const trapConfig: Record<ETrapType, TrapConfig> = {
            [ETrapType.Burst]: { manager: BurstManager, stateMachine: BurstStateMachine, totalPoint: 2, tileSize: new Size(TILE_WIDTH, TILE_HEIGHT) },
            [ETrapType.SpikesOne]: { manager: SpikeManager, stateMachine: SpikeStateMachine, totalPoint: 2 },
            [ETrapType.SpikesTwo]: { manager: SpikeManager, stateMachine: SpikeStateMachine, totalPoint: 3 },
            [ETrapType.SpikesThree]: { manager: SpikeManager, stateMachine: SpikeStateMachine, totalPoint: 4 },
            [ETrapType.SpikerFour]: { manager: SpikeManager, stateMachine: SpikeStateMachine, totalPoint: 5 },
        };

        const config = trapConfig[params.trapType];
        if (config) {
            trapManagerComponent = trap.addComponent(config.manager);
            stateMachine = config.stateMachine;
            params.totalPoint = config.totalPoint;
            params.tileSize = config.tileSize;
        }

        await trapManagerComponent.init({
            ...params,
            fsm: stateMachine,
        });

        return trapManagerComponent;
    }
}

export class SmokeFactory implements IEntityFactory {
    async create(params: IEntity, parentNode: Node) {
        const smoke = CreateUINode('smoke');
        smoke.setParent(parentNode);

        const SmokeManagerComponent = smoke.addComponent(SmokeManager);
        await SmokeManagerComponent.init({
            ...params,
        });

        return SmokeManagerComponent;
    }
}