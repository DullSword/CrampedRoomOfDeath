import level1 from "../Levels/Level1";
import level2 from "../Levels/Level2";
import level3 from "../Levels/Level3";
import level4 from "../Levels/Level4";
import level5 from "../Levels/Level5";
import level6 from "../Levels/Level6";
import level7 from "../Levels/Level7";
import level8 from "../Levels/Level8";
import level9 from "../Levels/Level9";
import level10 from "../Levels/Level10";
import level11 from "../Levels/Level11";
import level12 from "../Levels/Level12";
import level13 from "../Levels/Level13";
import level14 from "../Levels/Level14";
import level15 from "../Levels/Level15";
import level16 from "../Levels/Level16";
import level17 from "../Levels/Level17";
import level18 from "../Levels/Level18";
import level19 from "../Levels/Level19";
import level20 from "./Level20";

import { EDirection, EEnemyType, EEntityState, EEntityType, ETileType, ETrapType } from "../Enums";
import { Size, Vec2 } from "cc";
import { StateMachine } from "../Base/StateMachine";

export interface ITile {
    src: number | null,
    type: ETileType | null
};

export interface Ilevel {
    mapInfo: Array<Array<ITile>>,
    player: IEntity
    enemies: Array<IEnemy>
    spikes: Array<ITrap>
    bursts: Array<ITrap>
    door: IEntity
};

export interface IEntity {
    type?: EEntityType,
    position?: Vec2,
    fsm?: new () => StateMachine,
    direction?: EDirection,
    state?: EEntityState,
    tileSize?: Size,
}

export interface IEnemy extends IEntity {
    enemyType: EEnemyType;
}

export interface ITrap extends IEntity {
    trapType: ETrapType;
    totalPoint?: number,
    triggerDistance?: number,
}

const levels: Record<string, Ilevel> = {
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
    level11,
    level12,
    level13,
    level14,
    level15,
    level16,
    level17,
    level18,
    level19,
    level20,
};

export default levels;