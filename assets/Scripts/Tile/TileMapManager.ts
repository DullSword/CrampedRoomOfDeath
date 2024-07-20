import { _decorator, Component, randomRangeInt, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

import { CreateUINode } from '../../Utils';
import { TileManager } from './TileManager';
import DataManager from '../../Runtime/DataManager';
import ResourceManager from '../../Runtime/ResourceManager';

@ccclass('TileMapManager')
export class TileMapManager extends Component {
    async init() {
        const SpriteFrames = await ResourceManager.loadDir("texture/tile", SpriteFrame);

        const { mapInfo } = DataManager.instance;

        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const item = column[j];
                if (item.src === null || item.type === null) {
                    continue;
                }

                let number = item.src;
                if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
                    number += randomRangeInt(0, 4);
                }

                const imgSrc = `tile (${number})`;

                const node = CreateUINode();
                const spriteFrame = SpriteFrames.find((item) => item.name === imgSrc) || SpriteFrames[0];

                const tileManager = node.addComponent(TileManager);
                tileManager.init(spriteFrame, i, j);

                node.setParent(this.node);
            }
        }
    }
}


