import { Node } from 'cc';

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

        switch (params.enemyType) {
            case EEnemyType.WoodenSkeleton:
                enemyManagerComponent = enemy.addComponent(WoodenSkeletonManager);
                stateMachine = WoodenSkeletonStateMachine;
                break;
            case EEnemyType.IronSkeleton:
                enemyManagerComponent = enemy.addComponent(IronSkeletonManager);
                stateMachine = IronSkeletonStateMachine;
                break;
            default:
                break;
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

        switch (params.trapType) {
            case ETrapType.Burst:
                trapManagerComponent = trap.addComponent(BurstManager);
                stateMachine = BurstStateMachine;
                params.totalPoint = 2;
                break;
            default:
                break;
        }

        await trapManagerComponent.init({
            ...params,
            fsm: stateMachine,
        });

        return trapManagerComponent;
    }
}