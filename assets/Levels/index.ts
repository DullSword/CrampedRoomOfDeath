import level1 from "../Levels/Level1";
import level2 from "../Levels/Level2";

import { ETileType } from "../Enums";

export interface ITile {
    src: number | null,
    type: ETileType | null
};

export interface Ilevel {
    mapInfo: Array<Array<ITile>>
};

const levels: Record<string, Ilevel> = {
    level1,
    level2,
};

export default levels;