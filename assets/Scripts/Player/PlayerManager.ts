import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EntityManager } from '../../Base/EntityManager';
import { EInput, EEvent, EDirection, EEntityState, EEntityType, EActionResult } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';
import DataManager from '../../Runtime/DataManager';
import { IEntity } from '../../Levels';
import { mapInputToDirection, getRelativeDirection, mapTurnDirectionToBlockedDirection } from '../../Utils';
import { IShakeParams } from '../UI/ShakeManager';
import { TILE_WIDTH } from '../Tile/TileManager';

@ccclass('PlayerManager')
export class PlayerManager extends EntityManager {

    targetPosition: Vec2 = new Vec2(0, 0);

    private isMoving = false;

    private readonly velocity = 0.1;

    private target: EntityManager = null;

    private controlResolve: () => void = null;

    async init(params: IEntity) {
        await super.init({
            ...params,
            type: EEntityType.Player,
            fsm: PlayerStateMachine,
        });

        this.targetPosition.set(this.position);

        EventManager.instance.on(EEvent.PlayerInput, this.handleInput, this);

        EventManager.instance.on(EEvent.FallingDeath, this.onFallingDeath, this);
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.PlayerInput, this.handleInput, this);

        EventManager.instance.off(EEvent.FallingDeath, this.onFallingDeath, this);

        super.onDestroy();
    }

    protected update(dt: number): void {
        this.updatePosition();
        super.update(dt);
    }

    updatePosition() {
        if (this.position.x < this.targetPosition.x) {
            this.position.x += this.velocity;
        } else if (this.position.x > this.targetPosition.x) {
            this.position.x -= this.velocity;
        }

        if (this.position.y < this.targetPosition.y) {
            this.position.y += this.velocity;
        } else if (this.position.y > this.targetPosition.y) {
            this.position.y -= this.velocity;
        }

        if (
            Math.abs(this.position.x - this.targetPosition.x) < 0.01 &&
            Math.abs(this.position.y - this.targetPosition.y) < 0.01 &&
            this.isMoving
        ) {
            this.isMoving = false;
            this.position.x = this.targetPosition.x;
            this.position.y = this.targetPosition.y;

            EventManager.instance.emit(EEvent.PlayerMoveEnd);

            if (this.controlResolve) {
                this.controlResolve();
                this.controlResolve = null;
            }
        }
    }

    async handleInput(inputValue: EInput) {
        const { position: doorPosition } = DataManager.instance.door ?? {};

        // 避免在门的位置尝试移动或旋转时触发屏幕震动，导致 stage 的 position 在 adaptPos 被重置回上一关的位置
        if (!doorPosition || Vec2.strictEquals(doorPosition, this.position)) {
            return;
        }

        if (
            this.isMoving ||
            this.state === EEntityState.Death ||
            this.state === EEntityState.FallingDeath ||
            this.state === EEntityState.Attack ||
            this.state === EEntityState.TurnLeft ||
            this.state === EEntityState.TurnRight
        ) {
            return;
        }

        switch (this.isActionValid(inputValue)) {
            case EActionResult.Perform:
                EventManager.instance.emit(EEvent.RecordStep);
                await this.control(inputValue);
                EventManager.instance.emit(EEvent.playerActionCompleted);
                break;
            case EActionResult.Blocked:
                this.handleBlocked(inputValue);
                break;
            case EActionResult.Attack:
                EventManager.instance.emit(EEvent.RecordStep);
                this.tryAttackTarget(this.target, 2);
                EventManager.instance.emit(EEvent.playerActionCompleted);
                break;
            default:
                // do nothing
                break;
        }
    }

    isActionValid(inputValue: EInput) {
        const { targetPosition: lastPosition, direction } = this;

        const { tileInfo, enemies, door } = DataManager.instance;

        if (inputValue === EInput.TurnLeft || inputValue === EInput.TurnRight) {
            let turnLeft = inputValue === EInput.TurnLeft;

            const { passTilePosition, stayTilePosition } = this.calculatePositions(direction, lastPosition, turnLeft);

            const blockedEnemies = enemies.filter(enemy => enemy.state !== EEntityState.Death).filter(enemy => Vec2.strictEquals(enemy.position, passTilePosition) || Vec2.strictEquals(enemy.position, stayTilePosition));
            const bHasBlockedEnemies = blockedEnemies.length > 0;

            const bHasBlockedDoor = door.state !== EEntityState.Death && (Vec2.strictEquals(door.position, passTilePosition) || Vec2.strictEquals(door.position, stayTilePosition));

            const { bWeaponBlocked: bPassTileWeaponBlocked } = tileInfo[passTilePosition.x]?.[passTilePosition.y] ?? { bWeaponBlocked: false };
            const { bWeaponBlocked: bStayTileWeaponBlocked } = tileInfo[stayTilePosition.x]?.[stayTilePosition.y] ?? { bWeaponBlocked: false };

            if (
                bHasBlockedEnemies ||
                bHasBlockedDoor ||
                bPassTileWeaponBlocked ||
                bStayTileWeaponBlocked
            ) {
                return EActionResult.Blocked;
            }
        } else {
            const nextPosition = this.getNextPosition(inputValue, lastPosition);
            const nextPositionAfterNext = this.getNextPositionAfterNext(direction, nextPosition);

            const bIsNextPositionOutOfBounds = nextPosition.x < 0 || nextPosition.y < 0 || nextPosition.x >= tileInfo.length || nextPosition.y >= tileInfo[lastPosition.x].length;
            const bIsNextPositionAfterNextOutOfBounds = nextPositionAfterNext.x < 0 || nextPositionAfterNext.y < 0 || nextPositionAfterNext.x >= tileInfo.length || nextPositionAfterNext.y >= tileInfo[lastPosition.x].length;

            if (
                bIsNextPositionOutOfBounds ||
                (bIsNextPositionAfterNextOutOfBounds && !Vec2.strictEquals(nextPosition, door.position))
            ) {
                return EActionResult.Blocked;
            }

            const enemyTarget = enemies.filter(enemy => enemy.state !== EEntityState.Death).filter(enemy => Vec2.strictEquals(enemy.position, nextPositionAfterNext));

            const bIsSameDirection = mapInputToDirection(inputValue) === this.direction;

            const bShouldAttack = bIsSameDirection && enemyTarget.length > 0;
            if (bShouldAttack) {
                this.target = enemyTarget[0];
                return EActionResult.Attack;
            }

            // 检查 burst，因为 burst 可能在空地块上
            const { bursts } = DataManager.instance;
            const burstTarget = bursts.filter(burst => burst.state !== EEntityState.Death).filter(burst => Vec2.strictEquals(burst.position, nextPosition));

            const blockedEnemies = enemies.filter(enemy => enemy.state !== EEntityState.Death).filter(enemy => Vec2.strictEquals(enemy.position, nextPosition) || Vec2.strictEquals(enemy.position, nextPositionAfterNext));
            const bHasBlockedEnemies = blockedEnemies.length > 0;

            const bHasBlockedDoor = door.state !== EEntityState.Death && (Vec2.strictEquals(door.position, nextPosition) || Vec2.strictEquals(door.position, nextPositionAfterNext));

            const { bMovable: bNextPositionMovable } = tileInfo[nextPosition.x]?.[nextPosition.y] ?? {};
            const { bWeaponBlocked: bNextPositionAfterNextWeaponBlocked } = tileInfo[nextPositionAfterNext.x]?.[nextPositionAfterNext.y] ?? {};

            if (
                bHasBlockedEnemies ||
                bHasBlockedDoor ||
                (!bNextPositionMovable && burstTarget.length <= 0) ||
                bNextPositionAfterNextWeaponBlocked
            ) {
                return EActionResult.Blocked;
            }
        }

        return EActionResult.Perform;
    }

    calculatePositions(direction: EDirection, lastPosition: Vec2, turnLeft: boolean) {
        const { x, y } = lastPosition;

        let passTilePosition = new Vec2();
        let stayTilePosition = new Vec2();

        switch (direction) {
            case EDirection.Top:
                passTilePosition.set(turnLeft ? x - 1 : x + 1, y - 1);
                stayTilePosition.set(turnLeft ? x - 1 : x + 1, y);
                break;
            case EDirection.Bottom:
                passTilePosition.set(turnLeft ? x + 1 : x - 1, y + 1);
                stayTilePosition.set(turnLeft ? x + 1 : x - 1, y);
                break;
            case EDirection.Left:
                passTilePosition.set(x - 1, turnLeft ? y + 1 : y - 1);
                stayTilePosition.set(x, turnLeft ? y + 1 : y - 1);
                break;
            case EDirection.Right:
                passTilePosition.set(x + 1, turnLeft ? y - 1 : y + 1);
                stayTilePosition.set(x, turnLeft ? y - 1 : y + 1);
                break;
            default:
                break;
        }

        return { passTilePosition, stayTilePosition };
    }

    getNextPosition(inputValue: EInput, lastPosition: Vec2) {
        let nextPosition = new Vec2(lastPosition);

        switch (inputValue) {
            case EInput.Top:
                nextPosition.y -= 1;
                break;
            case EInput.Bottom:
                nextPosition.y += 1;
                break;
            case EInput.Left:
                nextPosition.x -= 1;
                break;
            case EInput.Right:
                nextPosition.x += 1;
                break;
            default:
                break;
        }

        return nextPosition;
    }

    getNextPositionAfterNext(direction: EDirection, nextPosition: Vec2) {
        let nextPositionAfterNext = new Vec2(nextPosition);

        switch (direction) {
            case EDirection.Top:
                nextPositionAfterNext.x = nextPosition.x;
                nextPositionAfterNext.y = nextPosition.y - 1;
                break;
            case EDirection.Bottom:
                nextPositionAfterNext.x = nextPosition.x;
                nextPositionAfterNext.y = nextPosition.y + 1;
                break;
            case EDirection.Left:
                nextPositionAfterNext.x = nextPosition.x - 1;
                nextPositionAfterNext.y = nextPosition.y;
                break;
            case EDirection.Right:
                nextPositionAfterNext.x = nextPosition.x + 1;
                nextPositionAfterNext.y = nextPosition.y;
                break;
            default:
                break;
        }

        return nextPositionAfterNext;
    }

    handleBlocked(inputValue: EInput) {
        let blockedDirection = EDirection.None;

        const inputDirection = mapInputToDirection(inputValue);
        if (inputDirection === this.direction) {
            this.state = EEntityState.BlockedFront;
            blockedDirection = inputDirection;
        } else if (getRelativeDirection(this.direction, inputDirection) === EDirection.Left) {
            this.state = EEntityState.BlockedLeft;
            blockedDirection = inputDirection;
        } else if (getRelativeDirection(this.direction, inputDirection) === EDirection.Right) {
            this.state = EEntityState.BlockedRight;
            blockedDirection = inputDirection;
        } else if (
            (inputValue === EInput.Top && this.direction === EDirection.Bottom) ||
            (inputValue === EInput.Bottom && this.direction === EDirection.Top) ||
            (inputValue === EInput.Left && this.direction === EDirection.Right) ||
            (inputValue === EInput.Right && this.direction === EDirection.Left)
        ) {
            this.state = EEntityState.BlockedBack;
            blockedDirection = inputDirection;
        }
        else if (inputValue === EInput.TurnLeft || inputValue === EInput.TurnRight) {
            this.state = inputValue === EInput.TurnLeft ? EEntityState.BlockedTurnLeft : EEntityState.BlockedTurnRight;
            blockedDirection = mapTurnDirectionToBlockedDirection(this.direction, inputValue);
        }

        const cycle = 0.2;
        const shakeParams: IShakeParams = {
            duration: 200,
            // 频率 = 1 / 周期
            frequency: 1 / cycle,
            amplitude: TILE_WIDTH * 0.05,
            direction: blockedDirection,
        };
        EventManager.instance.emit(EEvent.ScreenShake, shakeParams);
    }

    control(inputValue: EInput) {
        return new Promise<void>((resolve, reject) => {
            this.controlResolve = resolve;

            if (inputValue === EInput.Left) {
                this.targetPosition.x -= 1;
                this.isMoving = true;
                EventManager.instance.emit(EEvent.SpawnSmoke, new Vec2(this.position), inputValue);
            } else if (inputValue === EInput.Right) {
                this.targetPosition.x += 1;
                this.isMoving = true;
                EventManager.instance.emit(EEvent.SpawnSmoke, new Vec2(this.position), inputValue);
            }

            if (inputValue === EInput.Top) {
                this.targetPosition.y -= 1;
                this.isMoving = true;
                EventManager.instance.emit(EEvent.SpawnSmoke, new Vec2(this.position), inputValue);
            } else if (inputValue === EInput.Bottom) {
                this.targetPosition.y += 1;
                this.isMoving = true;
                EventManager.instance.emit(EEvent.SpawnSmoke, new Vec2(this.position), inputValue);
            }

            if (inputValue === EInput.TurnLeft) {
                switch (this.direction) {
                    case EDirection.Top:
                        this.direction = EDirection.Left;
                        break;
                    case EDirection.Bottom:
                        this.direction = EDirection.Right;
                        break;
                    case EDirection.Left:
                        this.direction = EDirection.Bottom;
                        break;
                    case EDirection.Right:
                        this.direction = EDirection.Top;
                        break;
                    default:
                        break;
                }

                this.state = EEntityState.TurnLeft;
                resolve();
            }

            if (inputValue === EInput.TurnRight) {
                switch (this.direction) {
                    case EDirection.Top:
                        this.direction = EDirection.Right;
                        break;
                    case EDirection.Bottom:
                        this.direction = EDirection.Left;
                        break;
                    case EDirection.Left:
                        this.direction = EDirection.Top;
                        break;
                    case EDirection.Right:
                        this.direction = EDirection.Bottom;
                        break;
                    default:
                        break;
                }

                this.state = EEntityState.TurnRight;
                resolve();
            }
        });
    }

    protected onFallingDeath(target: EntityManager, Instigator: EntityManager) {
        if (target === this) {
            this.state = EEntityState.FallingDeath;
        }
    }

    onAttackShake(direction: EDirection) {
        const cycle = 0.2;
        const shakeParams: IShakeParams = {
            duration: 200,
            // 频率 = 1 / 周期
            frequency: 1 / cycle,
            amplitude: TILE_WIDTH * 0.25,
            direction,
        };
        EventManager.instance.emit(EEvent.ScreenShake, shakeParams);
    }
}
