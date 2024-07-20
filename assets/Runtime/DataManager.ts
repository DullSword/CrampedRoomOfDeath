import Singleton from "../Base/Singleton";
import { ITile } from "../Levels";

export default class DataManager extends Singleton {
    mapInfo: Array<Array<ITile>> = [];
    mapRowCount: number = 0;
    mapColCount: number = 0;

    levelIndex: number = 1;

    static get instance() {
        return super.getInstance<DataManager>();
    }

    reset() {
        this.mapInfo = [];
        this.mapRowCount = 0;
        this.mapColCount = 0;
    }
}