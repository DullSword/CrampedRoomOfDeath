import { Vec2 } from "cc";
import Singleton from "../Base/Singleton";
import { ITile } from "../Levels";
import { DoorManager } from "../Scripts/Door/DoorManager";
import { EnemyManager } from "../Scripts/Enemies/EnemyManager";
import { PlayerManager } from "../Scripts/Player/PlayerManager";
import { SmokeManager } from "../Scripts/Smoke/SmokeManager";
import { TileManager } from "../Scripts/Tile/TileManager";
import { TrapManager } from "../Scripts/Traps/TrapManager";
import { EDirection, EEntityState } from "../Enums";

export interface IRecordEntity {
    position: Vec2;
    state: EEntityState;
}

export interface IRecordDirectionalEntity extends IRecordEntity {
    direction: EDirection;
}

export interface IRecordTrap extends IRecordEntity {
    currentPoint: number;
}

export type IRecord = {
    player: IRecordDirectionalEntity;
    enemies: Array<IRecordDirectionalEntity>;
    spikes: Array<IRecordTrap>;
    bursts: Array<IRecordTrap>;
    door: IRecordEntity;
};

export default class DataManager extends Singleton {
    mapInfo: Array<Array<ITile>> = [];
    mapRowCount: number = 0;
    mapColCount: number = 0;

    tileInfo: Array<Array<TileManager>> = [];

    levelIndex: number = 1;

    player: PlayerManager = null;
    enemies: Array<EnemyManager> = [];
    door: DoorManager = null;
    bursts: Array<TrapManager> = [];
    spikes: Array<TrapManager> = [];

    smokes: Array<SmokeManager> = [];

    records: IRecord[] = [];

    static get instance() {
        return super.getInstance<DataManager>();
    }

    reset() {
        this.mapInfo = [];
        this.mapRowCount = 0;
        this.mapColCount = 0;

        this.tileInfo = [];

        this.player = null;
        this.enemies = [];
        this.door = null;
        this.bursts = [];
        this.spikes = [];

        this.records = [];
    }
} 