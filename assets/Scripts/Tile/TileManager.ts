import { _decorator, Component, Sprite, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

export const TILE_WIDTH = 55;
export const TILE_HEIGHT = 55;

@ccclass('TileManager')
export class TileManager extends Component {
    init(spriteFrame: SpriteFrame, columnIdx: number, rowIdx: number) {
        const spriteComponent = this.addComponent(Sprite);
        spriteComponent.spriteFrame = spriteFrame;

        const transformComponent = this.getComponent(UITransform);
        transformComponent.setContentSize(TILE_WIDTH, TILE_HEIGHT);

        this.node.setPosition(columnIdx * TILE_WIDTH, -rowIdx * TILE_HEIGHT);
    }
}


