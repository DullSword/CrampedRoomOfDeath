import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { ELevelEvent } from '../../Enums';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;

    onLoad() {
        EventManager.instance.on(ELevelEvent.NextLevl, this.NextLevel, this);
    }

    onDestroy() {
        EventManager.instance.off(ELevelEvent.NextLevl, this.NextLevel);
    }

    start() {
        this.generateStage();

        this.initLevel();
    }

    initLevel() {
        const level = levels[`level${DataManager.instance.levelIndex}`];
        if (level) {
            this.clearLevel();

            this.level = level;

            DataManager.instance.mapInfo = this.level.mapInfo;
            DataManager.instance.mapRowCount = this.level.mapInfo.length || 0;
            DataManager.instance.mapColCount = this.level.mapInfo[0].length || 0;

            this.generateTileMap();
        }
    }

    clearLevel() {
        this.stage.destroyAllChildren();
        DataManager.instance.reset();
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
        const { mapRowCount, mapColCount } = DataManager.instance;

        const stageXOffset = -mapColCount * TILE_WIDTH / 2;
        const stageYOffset = mapRowCount * TILE_HEIGHT / 2;

        this.stage.setPosition(
            stageXOffset,
            stageYOffset
        );
    }

    NextLevel() {
        DataManager.instance.levelIndex++;
        this.initLevel();
    }
}
