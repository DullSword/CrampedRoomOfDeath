import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";

const mapInfo = [
  [
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
      type: ETileType.CliffRight,
    },
    {
      src: 1,
      type: ETileType.Floor,
    },
    {
      src: 17,
      type: ETileType.CliffRight,
    },
    {
      src: 9,
      type: ETileType.WallRow,
    },
    {
      src: 19,
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
      src: 9,
      type: ETileType.WallRow,
    },
    {
      src: 19,
      type: ETileType.CliffCenter,
    },
  ],
  [
    {
      src: 27,
      type: ETileType.WallRow,
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
      src: 19,
      type: ETileType.CliffCenter,
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
      src: 19,
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
      src: 9,
      type: ETileType.WallRow,
    },
    {
      src: 19,
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
      src: 19,
      type: ETileType.CliffCenter,
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
      src: 22,
      type: ETileType.WallRightTop,
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
  ],
];

const player: IEntity = {
  position: new Vec2(1, 0),
  direction: EDirection.Bottom,
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(3, 4),
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(8, 3),
    direction: EDirection.Left,
    enemyType: EEnemyType.WoodenSkeleton,
  },
];

const spikes: Array<ITrap> = [
  {
    position: new Vec2(3, 2),
    trapType: ETrapType.SpikesTwo,
  },
];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(1, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(5, 2),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(5, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(7, 3),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(7, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(8, 2),
    trapType: ETrapType.Burst,
  },
];

const door: IEntity = {
  position: new Vec2(10, 1),
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
