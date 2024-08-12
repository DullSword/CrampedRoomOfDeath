import { IEnemy, IEntity, Ilevel, ITrap } from "../Levels";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";
import { Vec2 } from "cc";

const mapInfo = [
    [
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 20,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 20,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
        },
        {
            src: null,
            type: null,
        },
    ],
    [
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: null,
            type: null,
        },
    ],
    [
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 15,
            type: ETileType.WallRightTop,
        },
        {
            src: 13,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: 22,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 14,
            type: ETileType.WallRightBottom,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: 22,
            type: ETileType.WallColumn,
        },
        {
            src: 13,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: null,
            type: null,
        },
        {
            src: 15,
            type: ETileType.WallRightTop,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 14,
            type: ETileType.WallRightBottom,
        },
        {
            src: 19,
            type: ETileType.CliffRight,
        },
    ],
];

const player: IEntity = {
    position: new Vec2(0, 8),
    direction: EDirection.Right,
};

const enemies: Array<IEnemy> = [
    {
        position: new Vec2(6, 7),
        enemyType: EEnemyType.WoodenSkeleton,
    },
];

const spikes: Array<ITrap> = [
    {
        position: new Vec2(4, 8),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(4, 9),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(6, 3),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(7, 3),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(6, 5),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(7, 5),
        trapType: ETrapType.SpikesOne,
    },
];

const bursts: Array<ITrap> = [];

const door: IEntity = {
    position: new Vec2(6, 0),
};

const level: Ilevel = {
    mapInfo,
    player,
    enemies,
    spikes,
    bursts,
    door,
};

export default level;
