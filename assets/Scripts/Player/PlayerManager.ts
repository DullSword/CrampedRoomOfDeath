import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EntityManager } from '../../Base/EntityManager';
import { EInput, EEvent, EDirection, EEntityState, EEntityType } from '../../Enums';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';

@ccclass('PlayerManager')
export class PlayerManager extends EntityManager {

    targetPosition: Vec2 = new Vec2(0, 0);

    private readonly velocity = 0.1;

    async init() {
        super.init({
            type: EEntityType.Player,
            position: new Vec2(0, 0),
            fsm: PlayerStateMachine,
            direction: EDirection.Top,
            state: EEntityState.Idle,
        });

        EventManager.instance.on(EEvent.PlayerInput, this.controll, this);
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

    controll(inputValue: EInput) {
        if (inputValue === EInput.Left) {
            this.targetPosition.x -= 1;
        } else if (inputValue === EInput.Right) {
            this.targetPosition.x += 1;
        }

        if (inputValue === EInput.Up) {
            this.targetPosition.y -= 1;
        } else if (inputValue === EInput.Down) {
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
    }
}
