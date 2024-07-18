import { _decorator, Component, resources, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

import { CreateUINode } from '../../Utils';
import { TileManager } from './TileManager';
import { DataManagerInstance } from '../../Runtime/DataManager';

@ccclass('TileMapManager')
export class TileMapManager extends Component {
    async init() {
        const SpriteFrames = await this.loadRes();

        const { mapInfo } = DataManagerInstance;

        for (let i = 0; i < mapInfo.length; i++) {
            const column = mapInfo[i];
            for (let j = 0; j < column.length; j++) {
                const item = column[j];
                if (item.src === null || item.type === null) {
                    continue;
                }

                const node = CreateUINode();

                const imgSrc = `tile (${item.src})`;
                const spriteFrame = SpriteFrames.find((item) => item.name === imgSrc) || SpriteFrames[0];

                const tileManager = node.addComponent(TileManager);
                tileManager.init(spriteFrame, i, j);

                node.setParent(this.node);
            }
        }
    }

    loadRes() {
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir("texture/tile/tile", SpriteFrame, function (err, assets) {
                if (err) {
                    reject(err);
                }
                resolve(assets);
            });
        })
    }
}


