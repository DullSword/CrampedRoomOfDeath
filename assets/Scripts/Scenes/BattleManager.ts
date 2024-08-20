import { _decorator, Component, director, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

import { TileMapManager } from '../Tile/TileMapManager';
import { CreateUINode } from '../../Utils';
import levels, { Ilevel } from '../../Levels';
import DataManager, { IRecord } from '../../Runtime/DataManager';
import { TILE_WIDTH, TILE_HEIGHT } from '../Tile/TileManager';
import EventManager from '../../Runtime/EventManager';
import { EDirection, EEntityState, EEvent, EScene } from '../../Enums';
import { TrapFactory, DoorFactory, EnemyFactory, PlayerFactory, SmokeFactory } from '../../Base/EntityFactory';
import FaderManager from '../../Runtime/FaderManager';
import { ShakeManager } from '../UI/ShakeManager';

@ccclass('BattleManager')
export class BattleManager extends Component {
    level: Ilevel;
    stage: Node;

    private smokeLayout: Node;

    private bIsInitialized: boolean = false;

    onLoad() {
        DataManager.instance.levelIndex = 1;

        EventManager.instance.on(EEvent.NextLevel, this.nextLevel, this);
        EventManager.instance.on(EEvent.PlayerMoveEnd, this.checkArrived, this);

        EventManager.instance.on(EEvent.SpawnSmoke, this.generateSmoke, this);

        EventManager.instance.on(EEvent.RecordStep, this.recordStep, this);
        EventManager.instance.on(EEvent.RevokeStep, this.revokeStep, this);

        EventManager.instance.on(EEvent.RestartLevel, this.initLevel, this);
        EventManager.instance.on(EEvent.QuitBattle, this.quitBattle, this);
    }

    onDestroy() {
        EventManager.instance.off(EEvent.NextLevel, this.nextLevel, this);
        EventManager.instance.off(EEvent.PlayerMoveEnd, this.checkArrived, this);

        EventManager.instance.off(EEvent.SpawnSmoke, this.generateSmoke, this);

        EventManager.instance.off(EEvent.RecordStep, this.recordStep, this);
        EventManager.instance.off(EEvent.RevokeStep, this.revokeStep, this);

        EventManager.instance.off(EEvent.RestartLevel, this.initLevel, this);
        EventManager.instance.off(EEvent.QuitBattle, this.quitBattle, this);
    }

    start() {
        this.generateStage();

        this.initLevel();
    }

    async initLevel() {
        const level = levels[`level${DataManager.instance.levelIndex}`];
        if (level) {
            // 初始化时也就是刚开始进入第一关时，不要“逐渐进入黑幕”，此后进入下一关时则需要“逐渐进入黑幕”
            if (this.bIsInitialized) {
                await FaderManager.instance.fadeIn();
            } else {
                FaderManager.instance.mask();
            }

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
            this.bIsInitialized = true;
        } else {
            this.quitBattle();
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

    nextLevel() {
        DataManager.instance.levelIndex++;
        this.initLevel();
    }

    quitBattle() {
        director.loadScene(EScene.Start);
    }

    checkArrived() {
        const { player, door } = DataManager.instance;
        const { position: playerPosition } = player;
        const { position: doorPosition, state: doorState } = door;

        if (Vec2.strictEquals(playerPosition, doorPosition) && doorState === EEntityState.Death) {
            EventManager.instance.emit(EEvent.NextLevel);
        }
    }

    recordStep() {
        const { player, enemies, door, bursts, spikes } = DataManager.instance;

        const record: IRecord = {
            player: {
                position: player.position.clone(),
                direction: player.direction,
                state: player.state
            },
            enemies: enemies.map(enemy => ({
                position: enemy.position,
                direction: enemy.direction,
                state: enemy.state,
            })),
            door: {
                position: door.position.clone(),
                state: door.state
            },
            bursts: bursts.map(burst => ({
                position: burst.position.clone(),
                state: burst.state,
                currentPoint: burst.currentPoint,
            })),
            spikes: spikes.map(spike => ({
                position: spike.position.clone(),
                state: spike.state,
                currentPoint: spike.currentPoint,
            }))
        }

        DataManager.instance.records.push(record);
    }

    revokeStep() {
        const record = DataManager.instance.records.pop();

        if (record) {
            const { player, enemies, door, bursts, spikes } = DataManager.instance;

            player.position = record.player.position.clone();
            player.targetPosition = record.player.position.clone();
            player.direction = record.player.direction;
            player.state = record.player.state;

            enemies.forEach((enemy, index) => {
                enemy.position = record.enemies[index].position;
                enemy.direction = record.enemies[index].direction;
                enemy.state = record.enemies[index].state;
            })

            door.position = record.door.position;
            door.state = record.door.state;

            bursts.forEach((burst, index) => {
                burst.position = record.bursts[index].position;
                burst.state = record.bursts[index].state;
                burst.currentPoint = record.bursts[index].currentPoint;
            })

            spikes.forEach((spike, index) => {
                spike.position = record.spikes[index].position;
                spike.state = record.spikes[index].state;
                spike.currentPoint = record.spikes[index].currentPoint;
            })
        }
    }
}
