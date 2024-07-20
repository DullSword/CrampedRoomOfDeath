import { Ilevel } from ".";
import { ETileType } from "../Enums";

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
            src: 14,
            type: ETileType.WallRightBottom,
        },
        {
            src: 1,
            type: ETileType.Floor,
        },
        {
            src: 22,
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

const level: Ilevel = {
    mapInfo,
};

export default level;