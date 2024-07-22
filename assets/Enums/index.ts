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
    Floor = 'Floor'
};

export enum ELevelEvent {
    NextLevl = 'NextLevel',
}

export enum EInputEvent {
    Move = 'Move',
}

export enum EInputDirection {
    Left = 'Left',
    Right = 'Right',
    Up = 'Up',
    Down = 'Down',
}