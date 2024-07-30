import { Component, Sprite, UITransform, Vec2 } from 'cc';

import { IEntity } from '../Levels';
import { EDirection, EEntityState, EEntityStateMachineParams, EEntityType, } from '../Enums';
import { StateMachine } from './StateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scripts/Tile/TileManager';

const ENTITY_WIDTH = 220;
const ENTITY_HEIGHT = 220;

export abstract class EntityManager extends Component {

    type: EEntityType;
    position: Vec2 = new Vec2(0, 0);
    fsm: StateMachine;

    private _direction: EDirection;
    private _state: EEntityState;

    get direction() {
        return this._direction;
    }

    set direction(value: EDirection) {
        this._direction = value;
        this.fsm.setParamValue(EEntityStateMachineParams.Direction, value);
    }

    get state() {
        return this._state;
    }

    set state(value: EEntityState) {
        this._state = value;
        this.fsm.setParamValue(value, true);
    }

    async init(params: IEntity) {
        const spriteComponent = this.addComponent(Sprite);
        spriteComponent.sizeMode = Sprite.SizeMode.CUSTOM;

        const UITransformComponent = this.getComponent(UITransform);
        UITransformComponent.setContentSize(ENTITY_WIDTH, ENTITY_HEIGHT);

        this.fsm = this.addComponent(params.fsm);
        await this.fsm.init();

        this.type = params.type;
        this.position = params.position;
        this.direction = params.direction;

        this.state = params.state;
    }

    protected update(dt: number): void {
        this.node.setPosition((this.position.x - 1.5) * TILE_WIDTH, -(this.position.y - 1.5) * TILE_HEIGHT);
    }
}
