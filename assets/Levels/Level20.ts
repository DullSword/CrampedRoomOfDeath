import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";

const mapInfo = [
  [
    {
      src: null,
      type: null,
    },
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
      type: ETileType.WallRightBottom,
    },
    {
      src: 1,
      type: ETileType.Floor,
    },
    {
      src: 20,
      type: ETileType.WallRow,
    },
    {
      src: 18,
      type: ETileType.CliffLeft,
    },
  ],

  [
    {
      src: null,
      type: null,
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
      src: null,
      type: null,
    },
    {
      src: 21,
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
      src: 1,
      type: ETileType.Floor,
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
      src: null,
      type: null,
    },
    {
      src: 15,
      type: ETileType.WallRightTop,
    },
    {
      src: 25,
      type: ETileType.WallColumn,
    },
    {
      src: 23,
      type: ETileType.WallRightBottom,
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
      src: 21,
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
      src: 22,
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
  position: new Vec2(0, 4),
  direction: EDirection.Right,
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(9, 1),
    direction: EDirection.Left,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(9, 3),
    direction: EDirection.Left,
    enemyType: EEnemyType.IronSkeleton,
  },
  {
    position: new Vec2(9, 4),
    direction: EDirection.Left,
    enemyType: EEnemyType.IronSkeleton,
  },
];

const spikes: Array<ITrap> = [];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(1, 2),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(1, 3),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 3),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(7, 4),
    trapType: ETrapType.Burst,
  },
];

const door: IEntity = {
  position: new Vec2(9, 0),
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
