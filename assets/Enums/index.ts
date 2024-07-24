export enum ETileType {
    WallRow = 'WallRow',
    WallColumn = 'WallColumn',
    WallLeftTop = 'WallLeftTop',
    WallLeftBottom = 'WallLeftBottom',
    WallRightTop = 'WallRightTop',
    WallRightBottom = 'WallRightBottom',
    CliffCenter = 'CliffCenter',
    CliffLeft = 'CliffLeft',
    CliffRight = 'CliffRight',
    Floor = 'Floor',
};

export enum EEvent {
    NextLevl = 'NextLevel',
    PlayerControll = 'PlayerControll',
}

export enum EControll {
    Left = 'Left',
    Right = 'Right',
    Up = 'Up',
    Down = 'Down',
    TurnLeft = 'TurnLeft',
    TurnRight = 'TurnRight',
}

export enum EStateMachineParamType {
    FLOAT,
    BOOLEAN,
    TRIGGER,
    INTEGER,
    VEC3_experimental,
    QUAT_experimental,
}

export enum EPlayerStateMachineParams {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
    Direction = 'Direction',
}

export enum EPlayerState {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
}

export enum EPlayerDirection {
    Left,
    Right,
    Up,
    Down,
}