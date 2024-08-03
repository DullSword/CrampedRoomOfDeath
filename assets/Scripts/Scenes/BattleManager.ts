import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EEnemyType, EEvent } from '../../Enums';
import { EnemyFactory, PlayerFactory } from '../../Base/EntityFactory';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;

    onLoad() {
        EventManager.instance.on(EEvent.NextLevel, this.NextLevel, this);
    }

    onDestroy() {
        EventManager.instance.off(EEvent.NextLevel, this.NextLevel, this);
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
            DataManager.instance.mapColCount = this.level.mapInfo.length || 0;
            DataManager.instance.mapRowCount = this.level.mapInfo[0].length || 0;

            this.generateTileMap();
            this.generatePlayer();
            this.generateEnemies();
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

    async generatePlayer() {
        const playerManagerComponent = await new PlayerFactory().create(
            {
                position: new Vec2(2, 7)
            },
            this.stage,
        );

        DataManager.instance.player = playerManagerComponent;

        EventManager.instance.emit(EEvent.playerSpawned);
    }

    async generateEnemies() {
        const woodenSkeletonManagerComponent = await new EnemyFactory().create(
            {
                position: new Vec2(2, 4),
                enemyType: EEnemyType.WoodenSkeleton,
            },
            this.stage,
        );

        DataManager.instance.enemies.push(woodenSkeletonManagerComponent);
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
