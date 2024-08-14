import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType } from "../Enums";

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
            src: 23,
            type: ETileType.WallLeftBottom,
        },
        {
            src: 18,
            type: ETileType.CliffLeft,
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
            src: 17,
            type: ETileType.CliffCenter,
        },
        {
            src: 20,
            type: ETileType.WallRow,
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
            src: 17,
            type: ETileType.CliffCenter,
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
            src: 21,
            type: ETileType.WallRightBottom,
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
            src: 21,
            type: ETileType.WallRow,
        },
        {
            src: 19,
            type: ETileType.CliffRight,
        },
    ],
];

const player: IEntity = {
    position: new Vec2(1, 3),
};

const enemies: Array<IEnemy> = [
    {
        position: new Vec2(5, 1),
        direction: EDirection.Left,
        enemyType: EEnemyType.WoodenSkeleton,
    },
];

const spikes: Array<ITrap> = [];

const bursts: Array<ITrap> = [];

const door: IEntity = {
    position: new Vec2(6, 1),
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
