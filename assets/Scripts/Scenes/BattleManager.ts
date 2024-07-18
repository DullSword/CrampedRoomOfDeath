import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import { DataManagerInstance } from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;

    start() {
        this.generateStage();

        this.initLevel();
    }

    initLevel() {
        const level = levels[`level${1}`];
        if (level) {
            this.level = level;

            DataManagerInstance.mapInfo = this.level.mapInfo;
            DataManagerInstance.mapRowCount = this.level.mapInfo.length || 0;
            DataManagerInstance.mapColCount = this.level.mapInfo[0].length || 0;

            this.generateTileMap();
        }
    }

    generateStage() {
        this.stage = CreateUINode();
        this.stage.setParent(this.node);
    }

    generateTileMap() {
        const tileMap = CreateUINode();
        tileMap.setParent(this.stage);
        const tileMapManager = tileMap.addComponent(TileMapManager);
        tileMapManager.init();

        this.adaptPos();
    }

    adaptPos() {
        const { mapRowCount, mapColCount } = DataManagerInstance;

        const stageXOffset = -mapColCount * TILE_WIDTH / 2;
        const stageYOffset = mapRowCount * TILE_HEIGHT / 2;

        this.stage.setPosition(
            stageXOffset,
            stageYOffset
        );
    }
}


