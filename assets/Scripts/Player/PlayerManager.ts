import { _decorator, Component, Sprite, UITransform, Animation, AnimationClip, animation, SpriteFrame, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import ResourceManager from '../../Runtime/ResourceManager';
import { EInputDirection, EInputEvent } from '../../Enums';
import { TILE_HEIGHT, TILE_WIDTH } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';

const PLAYER_WIDTH = 220;
const PLAYER_HEIGHT = 220;

const SAMPLE_RATE = 8;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    position: Vec2 = new Vec2(0, 0);
    targetPosition: Vec2 = new Vec2(0, 0);

    private readonly velocity = 0.1;

    async init() {
        await this.loadPlayer();

        EventManager.instance.on(EInputEvent.Move, this.move, this);
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

    move(event: EInputDirection) {
        if (event === EInputDirection.Left) {
            this.targetPosition.x -= 1;
        } else if (event === EInputDirection.Right) {
            this.targetPosition.x += 1;
        }

        if (event === EInputDirection.Up) {
            this.targetPosition.y -= 1;
        } else if (event === EInputDirection.Down) {
            this.targetPosition.y += 1;
        }
    }

    async loadPlayer() {
        const spriteComponent = this.node.addComponent(Sprite);
        spriteComponent.sizeMode = Sprite.SizeMode.CUSTOM;

        const UITransformComponent = this.node.addComponent(UITransform);
        UITransformComponent.setContentSize(PLAYER_WIDTH, PLAYER_HEIGHT);


        const spriteFrames = await ResourceManager.loadDir('texture/player/idle/top', SpriteFrame);
        const keyframes = spriteFrames.map((spriteFrame, index): [number, SpriteFrame] => [1 / SAMPLE_RATE * index, spriteFrame]);

        const animationClip = new AnimationClip();
        animationClip.duration = 1 / SAMPLE_RATE * spriteFrames.length;
        animationClip.wrapMode = AnimationClip.WrapMode.Loop;

        const track = new animation.ObjectTrack();
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame');
        track.channel.curve.assignSorted(keyframes);
        animationClip.addTrack(track);

        const animationComponent = this.node.addComponent(Animation);
        animationComponent.defaultClip = animationClip;
        animationComponent.play();
    }
}
