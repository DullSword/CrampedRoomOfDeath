import { _decorator, Component, Sprite, UITransform, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { EControll, EEvent, EPlayerState } from '../../Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { PlayerStateMachine } from './PlayerStateMachine';

const PLAYER_WIDTH = 220;
const PLAYER_HEIGHT = 220;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    position: Vec2 = new Vec2(0, 0);
    targetPosition: Vec2 = new Vec2(0, 0);
    fsm: PlayerStateMachine;

    private readonly velocity = 0.1;

    async init() {
        const spriteComponent = this.node.addComponent(Sprite);
        spriteComponent.sizeMode = Sprite.SizeMode.CUSTOM;

        const UITransformComponent = this.node.addComponent(UITransform);
        UITransformComponent.setContentSize(PLAYER_WIDTH, PLAYER_HEIGHT);

        this.fsm = this.addComponent(PlayerStateMachine);
        await this.fsm.init();
        this.fsm.setParamValue(EPlayerState.Idle, true);

        EventManager.instance.on(EEvent.PlayerControll, this.controll, this);
    }

    protected update(dt: number): void {
        this.updatePosition();
        this.node.setPosition((this.position.x - 0.5) * TILE_WIDTH, -(this.position.y - 0.5) * TILE_HEIGHT);
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

    controll(event: EControll) {
        if (event === EControll.Left) {
            this.targetPosition.x -= 1;
        } else if (event === EControll.Right) {
            this.targetPosition.x += 1;
        }

        if (event === EControll.Up) {
            this.targetPosition.y -= 1;
        } else if (event === EControll.Down) {
            this.targetPosition.y += 1;
        }

        if (event === EControll.TurnLeft) {
            this.fsm.setParamValue(EPlayerState.TurnLeft, true);
        }
    }
}
