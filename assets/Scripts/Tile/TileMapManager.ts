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

        const { mapInfo, tileInfo } = DataManager.instance;

        for (let columnIdx = 0; columnIdx < mapInfo.length; columnIdx++) {
            const column = mapInfo[columnIdx];

            tileInfo[columnIdx] = [];

            for (let rowIdx = 0; rowIdx < column.length; rowIdx++) {
                const item = column[rowIdx];
                if (item.src === null || item.type === null) {
                    continue;
                }

                let number = item.src;
                if ((number === 1 || number === 5 || number === 9) && columnIdx % 2 === 0 && rowIdx % 2 === 0) {
                    number += randomRangeInt(0, 4);
                }

                const imgSrc = `tile (${number})`;

                const node = CreateUINode(imgSrc);
                const spriteFrame = SpriteFrames.find((item) => item.name === imgSrc) || SpriteFrames[0];

                const tileManager = node.addComponent(TileManager);
                tileManager.init(item.type, spriteFrame, columnIdx, rowIdx);

                tileInfo[columnIdx][rowIdx] = tileManager;

                node.setParent(this.node);
            }
        }
    }
}
