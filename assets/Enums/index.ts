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
    PlayerInput = 'PlayerInput',
}

export enum EInput {
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

export enum EEntityStateMachineParams {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
    Direction = 'Direction',
}

export enum EEntityState {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
}

export enum EDirection {
    Left,
    Right,
    Top,
    Bottom,
}

export enum EEntityType {
    Player,
}