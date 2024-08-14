import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";

const mapInfo = [
  [
    {
      src: 20,
      type: ETileType.WallRow,
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
      src: 16,
      type: ETileType.WallLeftTop,
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
      src: 1,
      type: ETileType.Floor,
    },
    {
      src: 9,
      type: ETileType.WallRow,
    },
    {
      src: 19,
      type: ETileType.CliffRight,
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
      src: 14,
      type: ETileType.WallRightBottom,
    },
    {
      src: 19,
      type: ETileType.CliffRight,
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
  position: new Vec2(0, 1),
  direction: EDirection.Right,
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(2, 5),
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(4, 9),
    enemyType: EEnemyType.WoodenSkeleton,
  },
];

const spikes: Array<ITrap> = [];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(1, 5),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(1, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(1, 7),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(1, 8),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(1, 9),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 7),
    trapType: ETrapType.Burst,
  },
];

const door: IEntity = {
  position: new Vec2(6, 9),
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
