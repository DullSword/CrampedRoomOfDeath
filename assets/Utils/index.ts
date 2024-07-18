import { Node, Layers, UITransform, Vec2 } from 'cc';

export const CreateUINode = (name: string = "") => {
    const node = new Node(name);

    const transformComponent = node.addComponent(UITransform);
    transformComponent.anchorPoint = new Vec2(0, 1);

    node.layer = Layers.Enum.UI_2D;
    return node;
}

