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
      src: 22,
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
      src: 17,
      type: ETileType.CliffCenter,
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
      src: 23,
      type: ETileType.WallRightBottom,
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
  position: new Vec2(7, 7),
  direction: EDirection.Left,
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(2, 1),
    direction: EDirection.Bottom,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(2, 4),
    direction: EDirection.Right,
    enemyType: EEnemyType.WoodenSkeleton,
  },
];

const spikes: Array<ITrap> = [
  {
    position: new Vec2(1, 3),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(3, 3),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(4, 1),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(4, 4),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(4, 6),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(5, 3),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(6, 2),
    trapType: ETrapType.SpikesTwo,
  },
  {
    position: new Vec2(6, 6),
    trapType: ETrapType.SpikesTwo,
  },
];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(1, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 6),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(4, 2),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(4, 5),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(5, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(5, 5),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(6, 5),
    trapType: ETrapType.Burst,
  },
];

const door: IEntity = {
  position: new Vec2(0, 1),
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
