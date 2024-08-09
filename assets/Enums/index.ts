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
    NextLevel = 'NextLevel',
    PlayerInput = 'PlayerInput',
    playerSpawned = 'playerSpawned',
    PlayerMoveEnd = 'PlayerMoveEnd',
    playerActionCompleted = 'playerActionCompleted',
    Death = 'Death',
    FallingDeath = 'FallingDeath',
    OpenDoor = 'OpenDoor',
    ResetTrapPoint = 'ResetTrapPoint',
    SpawnSmoke = 'SpawnSmoke',
    ScreenShake = 'ScreenShake',
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

export enum EEntityState {
    Idle = 'Idle',
    TurnLeft = 'TurnLeft',
    TurnRight = 'TurnRight',
    BlockedFront = 'BlockedFront',
    BlockedBack = 'BlockedBack',
    BlockedLeft = 'BlockedLeft',
    BlockedRight = 'BlockedRight',
    BlockedTurnLeft = 'BlockedTurnLeft',
    BlockedTurnRight = 'BlockedTurnRight',
    Attack = 'Attack',
    Death = 'Death',
    FallingDeath = 'FallingDeath',
}

export enum EEntityStateMachineParams {
    Direction = 'Direction',
    Idle = EEntityState.Idle,
    TurnLeft = EEntityState.TurnLeft,
    TurnRight = EEntityState.TurnRight,
    BlockedFront = EEntityState.BlockedFront,
    BlockedBack = EEntityState.BlockedBack,
    BlockedLeft = EEntityState.BlockedLeft,
    BlockedRight = EEntityState.BlockedRight,
    BlockedTurnLeft = EEntityState.BlockedTurnLeft,
    BlockedTurnRight = EEntityState.BlockedTurnRight,
    Attack = EEntityState.Attack,
    Death = EEntityState.Death,
    FallingDeath = EEntityState.FallingDeath,
    CurrentPoint = 'CurrentPoint',
}

export enum EDirection {
    Left = 'Left',
    Right = 'Right',
    Top = 'Top',
    Bottom = 'Bottom',
    None = 'None',
}

export enum EEntityType {
    Player,
    Enemy,
    Door,
    Trap,
    Smoke,
}

export enum EEnemyType {
    WoodenSkeleton,
    IronSkeleton,
}

export enum ETrapType {
    Burst,
    SpikesOne,
    SpikesTwo,
    SpikesThree,
    SpikerFour,
}

export enum EActionResult {
    Perform,
    Attack,
    Blocked,
}

export enum FadeStatus {
    Idle,
    fadeIn,
    fadeOut,
}