import level1 from "../Levels/Level1";
import level2 from "../Levels/Level2";

import { EDirection, EEnemyType, EEntityState, EEntityType, ETileType, ETrapType } from "../Enums";
import { Size, Vec2 } from "cc";
import { StateMachine } from "../Base/StateMachine";

export interface ITile {
    src: number | null,
    type: ETileType | null
};

export interface Ilevel {
    mapInfo: Array<Array<ITile>>
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
};

export default levels;