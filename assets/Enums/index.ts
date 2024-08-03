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
    Death = 'Death',
    OpenDoor = 'OpenDoor',
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
    BlockedTurnLeft = 'BlockedTurnLeft',
    BlockedTurnRight = 'BlockedTurnRight',
    Attack = 'Attack',
    Death = 'Death',
}

export enum EEntityStateMachineParams {
    Direction = 'Direction',
    Idle = EEntityState.Idle,
    TurnLeft = EEntityState.TurnLeft,
    TurnRight = EEntityState.TurnRight,
    BlockedFront = EEntityState.BlockedFront,
    BlockedBack = EEntityState.BlockedBack,
    BlockedTurnLeft = EEntityState.BlockedTurnLeft,
    BlockedTurnRight = EEntityState.BlockedTurnRight,
    Attack = EEntityState.Attack,
    Death = EEntityState.Death,
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
    Door
}

export enum EEnemyType {
    WoodenSkeleton,
}

export enum EActionResult {
    Move,
    Attack,
    Blocked,
}