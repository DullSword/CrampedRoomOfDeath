import { _decorator, Component, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EDirection, EEntityState, EEvent } from '../../Enums';
import { TrapFactory, DoorFactory, EnemyFactory, PlayerFactory, SmokeFactory } from '../../Base/EntityFactory';
import FaderManager from '../../Runtime/FaderManager';
import { ShakeManager } from '../UI/ShakeManager';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;

    private smokeLayout: Node;

    onLoad() {
        EventManager.instance.on(EEvent.NextLevel, this.NextLevel, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.checkArrived, this);

        EventManager.instance.on(EEvent.SpawnSmoke, this.generateSmoke, this);
    }

    onDestroy() {
        EventManager.instance.off(EEvent.NextLevel, this.NextLevel, this);
        EventManager.instance.off(EEvent.PlayerMoveEnd, this.checkArrived, this);

        EventManager.instance.off(EEvent.SpawnSmoke, this.generateSmoke, this);
    }

    start() {
        this.generateStage();

        this.initLevel();
    }

    async initLevel() {
        const level = levels[`level${DataManager.instance.levelIndex}`];
        if (level) {
            await FaderManager.instance.fadeIn();

            this.clearLevel();

            this.level = level;

            DataManager.instance.mapInfo = this.level.mapInfo;
            DataManager.instance.mapColCount = this.level.mapInfo.length || 0;
            DataManager.instance.mapRowCount = this.level.mapInfo[0].length || 0;

            await this.generateTileMap();

            await Promise.all([
                this.generateEnemies(),
                this.generateDoor(),
                this.generateBurst(),
                this.generateSpike()]
            );

            this.generateSmokeLayout();

            await this.generatePlayer();

            await FaderManager.instance.fadeOut();
        }
    }

    clearLevel() {
        this.stage.destroyAllChildren();
        DataManager.instance.reset();
    }

    generateStage() {
        this.stage = CreateUINode('stage');
        this.stage.setParent(this.node);
        this.stage.addComponent(ShakeManager);
    }

    async generatePlayer() {
        const playerManagerComponent = await new PlayerFactory().create(
            { ...this.level.player },
            this.stage,
        );

        DataManager.instance.player = playerManagerComponent;

        EventManager.instance.emit(EEvent.playerSpawned);
    }

    async generateEnemies() {
        const promises = this.level.enemies.map(enemy => new EnemyFactory().create(
            { ...enemy },
            this.stage,
        ));

        const enemyComponents = await Promise.all(promises);

        DataManager.instance.enemies.push(...enemyComponents);
    }

    async generateDoor() {
        const doorManagerComponent = await new DoorFactory().create(
            { ...this.level.door },
            this.stage,
        );

        DataManager.instance.door = doorManagerComponent;
    }

    async generateBurst() {
        const promises = this.level.bursts.map(burst => new TrapFactory().create(
            { ...burst },
            this.stage,
        ));

        const burstComponents = await Promise.all(promises);

        DataManager.instance.bursts.push(...burstComponents);
    }

    async generateSpike() {
        const promises = this.level.spikes.map(spike => new TrapFactory().create(
            { ...spike },
            this.stage,
        ));

        const spikeComponents = await Promise.all(promises);

        DataManager.instance.spikes.push(...spikeComponents);
    }

    generateSmokeLayout() {
        this.smokeLayout = CreateUINode('smokeLayout');
        this.smokeLayout.setParent(this.stage);
    }

    async generateSmoke(position: Vec2, direction: EDirection) {
        const { smokes } = DataManager.instance;

        const smokePoolCount = 5;

        const deathSmoke = smokes.length >= smokePoolCount && smokes.find(smoke => smoke.state === EEntityState.Death);
        if (deathSmoke) {
            deathSmoke.position = position;
            deathSmoke.direction = direction;
            deathSmoke.state = EEntityState.Idle;
        } else {
            const smokeManagerComponent = await new SmokeFactory().create(
                {
                    position,
                    direction,
                    state: EEntityState.Idle
                },
                this.smokeLayout,
            );

            smokes.push(smokeManagerComponent);
        }
    }

    async generateTileMap() {
        const tileMap = CreateUINode('map');
        tileMap.setParent(this.stage);
        const tileMapManager = tileMap.addComponent(TileMapManager);
        await tileMapManager.init();

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

    checkArrived() {
        const { player, door } = DataManager.instance;
        const { position: playerPosition } = player;
        const { position: doorPosition, state: doorState } = door;

        if (Vec2.strictEquals(playerPosition, doorPosition) && doorState === EEntityState.Death) {
            EventManager.instance.emit(EEvent.NextLevel);
        }
    }
}
