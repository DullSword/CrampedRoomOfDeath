import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";

const mapInfo = [
    [
        {
            src: 16,
            type: ETileType.WallLeftTop,
        },
        {
            src: 5,
            type: ETileType.WallColumn,
        },
        {
            src: 23,
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
    ],
    [
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
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
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: null,
            type: null,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
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
    ],
    [
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: 20,
            type: ETileType.WallRow,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: 21,
            type: ETileType.WallRow,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
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
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
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
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
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
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
    [
        {
            src: 9,
            type: ETileType.WallRow,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 24,
            type: ETileType.WallRow,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
    ],
];

const player: IEntity = {
    position: new Vec2(1, 7),
};

const enemies: Array<IEnemy> = [
    {
        position: new Vec2(8, 1),
        direction: EDirection.Left,
        enemyType: EEnemyType.WoodenSkeleton,
    },
];

const spikes: Array<ITrap> = [];

const bursts: Array<ITrap> = [
    {
        position: new Vec2(1, 2),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(1, 5),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(1, 6),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(2, 1),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(3, 1),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(4, 1),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(5, 1),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(6, 1),
        trapType: ETrapType.Burst,
    },
    {
        position: new Vec2(6, 2),
        trapType: ETrapType.Burst,
    },
];

const door: IEntity = {
    position: new Vec2(9, 1),
    direction: EDirection.Left,
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
