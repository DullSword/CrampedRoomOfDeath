import level1 from "../Levels/Level1";
import { TILE_TYPE_ENUM } from "../Enums";

export interface ITile {
    src: number | null,
    type: TILE_TYPE_ENUM | null
};

export interface Ilevel {
    mapInfo: Array<Array<ITile>>
};

const levels: Record<string, Ilevel> = {
    level1,
};

export default levels;