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
      src: 20,
      type: ETileType.WallLeftBottom,
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
      src: 16,
      type: ETileType.WallLeftTop,
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
      src: 16,
      type: ETileType.WallLeftTop,
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
      src: 19,
      type: ETileType.CliffRight,
    },
    {
      src: null,
      type: null,
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
    {
      src: null,
      type: null,
    },
  ],
];

const player: IEntity = {
  position: new Vec2(0, 1),
  direction: EDirection.Right,
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(4, 4),
    direction: EDirection.Left,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(5, 3),
    direction: EDirection.Left,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(6, 2),
    direction: EDirection.Left,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(4, 6),
    enemyType: EEnemyType.IronSkeleton,
  },
  {
    position: new Vec2(4, 7),
    enemyType: EEnemyType.IronSkeleton,
  },
];

const spikes: Array<ITrap> = [
  {
    position: new Vec2(4, 5),
    trapType: ETrapType.SpikesThree,
  },
  {
    position: new Vec2(5, 5),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(6, 5),
    trapType: ETrapType.SpikesOne,
  },
];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(3, 5),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 7),
    trapType: ETrapType.Burst,
  },
];

const door: IEntity = {
  position: new Vec2(0, 7),
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
