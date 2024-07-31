import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EntityManager } from '../../Base/EntityManager';
import { EInput, EEvent, EDirection, EEntityState, EEntityType, EActionResult } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';
import DataManager from '../../Runtime/DataManager';

@ccclass('PlayerManager')
export class PlayerManager extends EntityManager {

    targetPosition: Vec2 = new Vec2(0, 0);

    private readonly velocity = 0.1;

    async init() {
        await super.init({
            type: EEntityType.Player,
            position: new Vec2(2, 8),
            fsm: PlayerStateMachine,
            direction: EDirection.Top,
            state: EEntityState.Idle,
        });

        this.targetPosition.set(this.position);

        EventManager.instance.on(EEvent.PlayerInput, this.handleInput, this);
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

        if (Math.abs(this.position.x - this.targetPosition.x) < 0.01) {
            this.position.x = this.targetPosition.x;
        }
        if (Math.abs(this.position.y - this.targetPosition.y) < 0.01) {
            this.position.y = this.targetPosition.y;
        }
    }

    handleInput(inputValue: EInput) {
        if (this.isActionValid(inputValue) !== EActionResult.Success) {
            if (inputValue.toString() === this.direction.toString()) {
                this.state = EEntityState.BlockedFront;
            } else if (inputValue === EInput.TurnLeft) {
                this.state = EEntityState.BlockedTurnLeft;
            } else if (inputValue === EInput.TurnRight) {
                this.state = EEntityState.BlockedTurnRight;
            }

            return;
        }

        this.controll(inputValue);
    }

    isActionValid(inputValue: EInput) {
        const { targetPosition: lastPosition, direction } = this;

        const { tileInfo } = DataManager.instance;

        if (inputValue === EInput.TurnLeft || inputValue === EInput.TurnRight) {
            let turnLeft = inputValue === EInput.TurnLeft;

            const { passTilePosition, stayTilePosition } = this.calculatePositions(direction, lastPosition, turnLeft);

            if (
                passTilePosition.x < 0 || passTilePosition.y < 0 || passTilePosition.x >= tileInfo.length || passTilePosition.y >= tileInfo[0].length ||
                stayTilePosition.x < 0 || stayTilePosition.y < 0 || stayTilePosition.x >= tileInfo.length || stayTilePosition.y >= tileInfo[0].length
            ) {
                return EActionResult.Blocked;
            }

            const { bWeaponBlocked: bPassTileWeaponBlocked } = tileInfo[passTilePosition.x][passTilePosition.y];
            const { bWeaponBlocked: bStayTileWeaponBlocked } = tileInfo[stayTilePosition.x][stayTilePosition.y];

            if (bPassTileWeaponBlocked || bStayTileWeaponBlocked) {
                return EActionResult.Blocked;
            }
        } else {
            const nextPosition = this.getNextPosition(inputValue, lastPosition);
            const nextPositionAfterNext = this.getNextPositionAfterNext(direction, nextPosition);

            if (
                nextPosition.x < 0 || nextPosition.y < 0 || nextPosition.x >= tileInfo.length || nextPosition.y >= tileInfo[0].length ||
                nextPositionAfterNext.x < 0 || nextPositionAfterNext.y < 0 || nextPositionAfterNext.x >= tileInfo.length || nextPositionAfterNext.y >= tileInfo[0].length
            ) {
                return EActionResult.Blocked;
            }

            const { bMovable: bNextPositionMovable } = tileInfo[nextPosition.x][nextPosition.y];
            const { bWeaponBlocked: bnextPositionAfterNextWeaponBlocked } = tileInfo[nextPositionAfterNext.x][nextPositionAfterNext.y];

            if (!bNextPositionMovable || bnextPositionAfterNextWeaponBlocked) {
                return EActionResult.Blocked;
            }
        }

        return EActionResult.Success;
    }

    calculatePositions(direction: EDirection, lastPosition: Vec2, turnLeft: boolean) {
        const { x, y } = lastPosition;

        let passTilePosition = new Vec2();
        let stayTilePosition = new Vec2();

        if (direction === EDirection.Top) {
            passTilePosition.set(turnLeft ? x - 1 : x + 1, y - 1);
            stayTilePosition.set(turnLeft ? x - 1 : x + 1, y);
        } else if (direction === EDirection.Bottom) {
            passTilePosition.set(turnLeft ? x + 1 : x - 1, y + 1);
            stayTilePosition.set(turnLeft ? x + 1 : x - 1, y);
        } else if (direction === EDirection.Left) {
            passTilePosition.set(x - 1, turnLeft ? y + 1 : y - 1);
            stayTilePosition.set(x, turnLeft ? y + 1 : y - 1);
        } else if (direction === EDirection.Right) {
            passTilePosition.set(x + 1, turnLeft ? y - 1 : y + 1);
            stayTilePosition.set(x, turnLeft ? y - 1 : y + 1);
        }

        return { passTilePosition, stayTilePosition };
    }

    getNextPosition(inputValue: EInput, lastPosition: Vec2) {
        let nextPosition = new Vec2(lastPosition);

        if (inputValue === EInput.Top) {
            nextPosition.y -= 1;
        } else if (inputValue === EInput.Bottom) {
            nextPosition.y += 1;
        } else if (inputValue === EInput.Left) {
            nextPosition.x -= 1;
        } else if (inputValue === EInput.Right) {
            nextPosition.x += 1;
        }

        return nextPosition;
    }

    getNextPositionAfterNext(direction: EDirection, nextPosition: Vec2) {
        let nextPositionAfterNext = new Vec2(nextPosition);

        if (direction === EDirection.Top) {
            nextPositionAfterNext.x = nextPosition.x;
            nextPositionAfterNext.y = nextPosition.y - 1;
        } else if (direction === EDirection.Bottom) {
            nextPositionAfterNext.x = nextPosition.x;
            nextPositionAfterNext.y = nextPosition.y + 1;
        } else if (direction === EDirection.Left) {
            nextPositionAfterNext.x = nextPosition.x - 1;
            nextPositionAfterNext.y = nextPosition.y;
        } else if (direction === EDirection.Right) {
            nextPositionAfterNext.x = nextPosition.x + 1;
            nextPositionAfterNext.y = nextPosition.y;
        }

        return nextPositionAfterNext;
    }

    controll(inputValue: EInput) {
        if (inputValue === EInput.Left) {
            this.targetPosition.x -= 1;
        } else if (inputValue === EInput.Right) {
            this.targetPosition.x += 1;
        }

        if (inputValue === EInput.Top) {
            this.targetPosition.y -= 1;
        } else if (inputValue === EInput.Bottom) {
            this.targetPosition.y += 1;
        }

        if (inputValue === EInput.TurnLeft) {
            if (this.direction === EDirection.Top) {
                this.direction = EDirection.Left;
            }
            else if (this.direction === EDirection.Bottom) {
                this.direction = EDirection.Right;
            }
            else if (this.direction === EDirection.Left) {
                this.direction = EDirection.Bottom;
            }
            else if (this.direction === EDirection.Right) {
                this.direction = EDirection.Top;
            }

            this.state = EEntityState.TurnLeft;
        }

        if (inputValue === EInput.TurnRight) {
            if (this.direction === EDirection.Top) {
                this.direction = EDirection.Right;
            }
            else if (this.direction === EDirection.Bottom) {
                this.direction = EDirection.Left;
            }
            else if (this.direction === EDirection.Left) {
                this.direction = EDirection.Top;
            }
            else if (this.direction === EDirection.Right) {
                this.direction = EDirection.Bottom;
            }

            this.state = EEntityState.TurnRight;
        }
    }
}
