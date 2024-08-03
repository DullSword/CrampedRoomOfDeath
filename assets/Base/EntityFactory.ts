import { Node, Vec2 } from 'cc';

import { IEnemy, IEntity, ITrap } from '../Levels';
import { EDirection, EEnemyType, EEntityState, EEntityType, ETrapType } from '../Enums';
import { CreateUINode } from '../Utils';
import { EntityManager } from './EntityManager';
import { StateMachine } from './StateMachine';

import { PlayerManager } from '../Scripts/Player/PlayerManager';
import { PlayerStateMachine } from '../Scripts/Player/PlayerStateMachine';

import { EnemyManager } from '../Scripts/Enemies/EnemyManager';
import { WoodenSkeletonManager } from '../Scripts/Enemies/WoodenSkeleton/WoodenSkeletonManager';
import { WoodenSkeletonStateMachine } from '../Scripts/Enemies/WoodenSkeleton/WoodenSkeletonStateMachine';
import { IronSkeletonManager } from '../Scripts/Enemies/IronSkeleton/IronSkeletonManager';
import { IronSkeletonStateMachine } from '../Scripts/Enemies/IronSkeleton/IronSkeletonStateMachine';

import { DoorManager } from '../Scripts/Door/DoorManager';
import { DoorStateMachine } from '../Scripts/Door/DoorStateMachine';

import { TrapManager } from '../Scripts/Traps/TrapManager';
import { BurstManager } from '../Scripts/Traps/Burst/BurstManager';
import { BurstStateMachine } from '../Scripts/Traps/Burst/BurstStateMachine';

export interface IEntityFactory {
    create(params: Partial<IEntity>, parentNode: Node): Promise<EntityManager>;
}

export class PlayerFactory implements IEntityFactory {
    async create({ position = new Vec2(0, 0), direction = EDirection.Top, state = EEntityState.Idle }: Omit<IEntity, 'type' | 'fsm'>, parentNode: Node) {
        const player = CreateUINode('player');
        player.setParent(parentNode);

        const playerManagerComponent = player.addComponent(PlayerManager);
        await playerManagerComponent.init({
            type: EEntityType.Player,
            fsm: PlayerStateMachine,
            position: position,
            direction: direction,
            state: state,
        });

        return playerManagerComponent;
    }
}

export class EnemyFactory implements IEntityFactory {
    async create({ position = new Vec2(0, 0), direction = EDirection.Top, state = EEntityState.Idle, enemyType }: Omit<IEnemy, 'type' | 'fsm'>, parentNode: Node) {
        const enemy = CreateUINode('enemy');
        enemy.setParent(parentNode);

        let enemyManagerComponent: EnemyManager;
        let stateMachine: new () => StateMachine;

        switch (enemyType) {
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
            type: EEntityType.Enemy,
            fsm: stateMachine,
            position: position || new Vec2(0, 0),
            direction: direction || EDirection.Top,
            state: state || EEntityState.Idle,
            enemyType,
        });

        return enemyManagerComponent;
    }
}

export class DoorFactory implements IEntityFactory {
    async create({ position = new Vec2(0, 0), direction = EDirection.Top, state = EEntityState.Idle }: Omit<IEntity, 'type' | 'fsm'>, parentNode: Node) {
        const door = CreateUINode('door');
        door.setParent(parentNode);

        const doorManagerComponent = door.addComponent(DoorManager);
        await doorManagerComponent.init({
            type: EEntityType.Door,
            fsm: DoorStateMachine,
            position: position,
            direction: direction,
            state: state,
        });

        return doorManagerComponent;
    }
}

export class TrapFactory implements IEntityFactory {
    async create({ position = new Vec2(0, 0), direction = EDirection.Top, state = EEntityState.Idle, trapType, triggerDistance = 0 }: Omit<ITrap, 'type' | 'fsm'>, parentNode: Node) {
        const trap = CreateUINode('trap');
        trap.setParent(parentNode);

        let trapManagerComponent: TrapManager;
        let stateMachine: new () => StateMachine;

        switch (trapType) {
            case ETrapType.Burst:
                trapManagerComponent = trap.addComponent(BurstManager);
                stateMachine = BurstStateMachine;
                break;
            default:
                break;
        }

        await trapManagerComponent.init({
            type: EEntityType.Trap,
            fsm: stateMachine,
            position: position,
            direction: direction,
            state: state,
            trapType,
            triggerDistance,
        });

        return trapManagerComponent;
    }
}