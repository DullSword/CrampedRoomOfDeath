import { Vec2 } from "cc";
import { IEnemy, IEntity, Ilevel, ITrap } from ".";
import { EDirection, EEnemyType, ETileType, ETrapType } from "../Enums";

const mapInfo = [
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
      src: 13,
      type: ETileType.WallLeftBottom,
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
      src: 16,
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
      src: 23,
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
      src: 15,
      type: ETileType.WallRightTop,
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
  position: new Vec2(2, 11),
};

const enemies: Array<IEnemy> = [
  {
    position: new Vec2(1, 1),
    direction: EDirection.Bottom,
    enemyType: EEnemyType.WoodenSkeleton,
  },
  {
    position: new Vec2(2, 7),
    direction: EDirection.Bottom,
    enemyType: EEnemyType.WoodenSkeleton,
  },
];

const spikes: Array<ITrap> = [
  {
    position: new Vec2(1, 3),
    trapType: ETrapType.SpikesThree,
  },
  {
    position: new Vec2(3, 6),
    trapType: ETrapType.SpikesOne,
  },
  {
    position: new Vec2(2, 9),
    trapType: ETrapType.SpikesTwo,
  },
];

const bursts: Array<ITrap> = [
  {
    position: new Vec2(3, 1),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 4),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 5),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(2, 10),
    trapType: ETrapType.Burst,
  },
  {
    position: new Vec2(3, 10),
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
