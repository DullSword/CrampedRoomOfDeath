import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EEvent } from '../../Enums';
import { PlayerManager } from '../Player/PlayerManager';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;
    player: Node;

    onLoad() {
        EventManager.instance.on(EEvent.NextLevl, this.NextLevel, this);
    }

    onDestroy() {
        EventManager.instance.off(EEvent.NextLevl, this.NextLevel);
    }

    start() {
        this.generateStage();
        this.generatePlayer();

        this.initLevel();
    }

    initLevel() {
        const level = levels[`level${DataManager.instance.levelIndex}`];
        if (level) {
            this.clearLevel();

            this.level = level;

            DataManager.instance.mapInfo = this.level.mapInfo;
            DataManager.instance.mapColCount = this.level.mapInfo.length || 0;
            DataManager.instance.mapRowCount = this.level.mapInfo[0].length || 0;

            this.generateTileMap();
        }
    }

    clearLevel() {
        this.stage.destroyAllChildren();
        DataManager.instance.reset();
    }

    generateStage() {
        this.stage = CreateUINode('stage');
        this.stage.setParent(this.node);
    }

    generatePlayer() {
        this.player = CreateUINode('player');
        this.player.setParent(this.node);

        const playerManagerComponent = this.player.addComponent(PlayerManager);
        playerManagerComponent.init();
    }

    generateTileMap() {
        const tileMap = CreateUINode('map');
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
