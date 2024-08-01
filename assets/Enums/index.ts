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
    playerSpawned = 'playerSpawned',
    PlayerMoveEnd = 'PlayerMoveEnd',
}

export enum EInput {
    Left = 'Left',
    Right = 'Right',
    Top = 'Top',
    Bottom = 'Bottom',
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
    TurnRight = 'TurnRight',
    Direction = 'Direction',
    BlockedFront = 'BlockedFront',
    BlockedBack = 'BlockedBack',
    BlockedTurnLeft = 'BlockedTurnLeft',
    BlockedTurnRight = 'BlockedTurnRight',
}

export enum EEntityState {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
    TurnRight = 'TurnRight',
    BlockedFront = 'BlockedFront',
    BlockedBack = 'BlockedBack',
    BlockedTurnLeft = 'BlockedTurnLeft',
    BlockedTurnRight = 'BlockedTurnRight',
}

export enum EDirection {
    Left = 'Left',
    Right = 'Right',
    Top = 'Top',
    Bottom = 'Bottom',
}

export enum EEntityType {
    Player,
    Enemy,
}

export enum EActionResult {
    Success,
    Blocked,
}