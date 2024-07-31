import { _decorator, Component, Sprite, SpriteFrame, UITransform } from 'cc';
import { ETileType } from '../../Enums';
const { ccclass, property } = _decorator;

export const TILE_WIDTH = 55;
export const TILE_HEIGHT = 55;

@ccclass('TileManager')
export class TileManager extends Component {
    type: ETileType;
    bMovable: boolean;
    bWeaponBlocked: boolean;

    init(type: ETileType, spriteFrame: SpriteFrame, columnIdx: number, rowIdx: number) {
        if (type.includes('Wall')) {
            this.bMovable = false;
            this.bWeaponBlocked = true;
        } else if (type.includes('Cliff')) {
            this.bMovable = false;
            this.bWeaponBlocked = false;
        } else if (type.includes('Floor')) {
            this.bMovable = true;
            this.bWeaponBlocked = false;
        }

        const spriteComponent = this.addComponent(Sprite);
        spriteComponent.spriteFrame = spriteFrame;

        const transformComponent = this.getComponent(UITransform);
        transformComponent.setContentSize(TILE_WIDTH, TILE_HEIGHT);

        this.node.setPosition(columnIdx * TILE_WIDTH, -rowIdx * TILE_HEIGHT);
    }
}


