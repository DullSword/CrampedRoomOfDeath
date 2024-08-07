import { Node, Layers, UITransform, Vec2 } from 'cc';
import { EDirection, EInput } from '../Enums';

export const CreateUINode = (name: string = "") => {
    const node = new Node(name);

    const transformComponent = node.addComponent(UITransform);
    transformComponent.anchorPoint = new Vec2(0, 1);

    node.layer = Layers.Enum.UI_2D;
    return node;
}

export const mapInputToDirection = (input: EInput) => {
    switch (input) {
        case EInput.Left:
            return EDirection.Left;
        case EInput.Right:
            return EDirection.Right;
        case EInput.Top:
            return EDirection.Top;
        case EInput.Bottom:
            return EDirection.Bottom;
        default:
            return null; // 如果无法映射，返回 null
    }
}

export const numberToWord = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
};
