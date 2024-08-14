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
            src: 13,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
        },
    ],
    [
        {
            src: 21,
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
            src: 21,
            type: ETileType.WallRightBottom,
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
            src: 17,
            type: ETileType.CliffCenter,
        },
    ],
    [
        {
            src: 20,
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
            src: 20,
            type: ETileType.WallLeftBottom,
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
    position: new Vec2(2, 7),
};

const enemies: Array<IEnemy> = [
    {
        position: new Vec2(2, 2),
        direction: EDirection.Bottom,
        enemyType: EEnemyType.WoodenSkeleton,
    },
];

const spikes: Array<ITrap> = [
    {
        position: new Vec2(1, 4),
        trapType: ETrapType.SpikesOne,
    },
    {
        position: new Vec2(2, 4),
        trapType: ETrapType.SpikesTwo,
    },
    {
        position: new Vec2(3, 4),
        trapType: ETrapType.SpikesTwo,
    },
    {
        position: new Vec2(4, 4),
        trapType: ETrapType.SpikesThree,
    },
];

const bursts: Array<ITrap> = [];

const door: IEntity = {
    position: new Vec2(2, 0),
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
