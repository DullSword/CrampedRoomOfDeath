import Singleton from "../Base/Singleton";
import { ITile } from "../Levels";
import { DoorManager } from "../Scripts/Door/DoorManager";
import { EnemyManager } from "../Scripts/Enemies/EnemyManager";
import { PlayerManager } from "../Scripts/Player/PlayerManager";
import { TileManager } from "../Scripts/Tile/TileManager";

export default class DataManager extends Singleton {
    mapInfo: Array<Array<ITile>> = [];
    mapRowCount: number = 0;
    mapColCount: number = 0;

    tileInfo: Array<Array<TileManager>> = [];

    levelIndex: number = 1;

    player: PlayerManager = null;
    enemies: Array<EnemyManager> = [];
    door: DoorManager = null;

    static get instance() {
        return super.getInstance<DataManager>();
    }

    reset() {
        this.mapInfo = [];
        this.mapRowCount = 0;
        this.mapColCount = 0;
    }
}