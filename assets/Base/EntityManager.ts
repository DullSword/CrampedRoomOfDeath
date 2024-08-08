import { Component, Size, Sprite, UITransform, Vec2 } from 'cc';

import { IEntity } from '../Levels';
import { EDirection, EEntityState, EEntityStateMachineParams, EEntityType, EEvent, } from '../Enums';
import { StateMachine } from './StateMachine';
import { TILE_HEIGHT, TILE_WIDTH } from '../Scripts/Tile/TileManager';
import EventManager from '../Runtime/EventManager';
import DataManager from '../Runtime/DataManager';

const DEFAULT_ENTITY_SIZE = new Size(220, 220);

export class EntityManager extends Component {

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
        UITransformComponent.setContentSize(params.tileSize ?? DEFAULT_ENTITY_SIZE);

        await this.initStateMachine(params.fsm);

        this.type = params.type;
        this.position = params.position ?? new Vec2(0, 0);
        this.direction = params.direction ?? EDirection.Top;

        this.state = params.state ?? EEntityState.Idle;

        EventManager.instance.on(EEvent.Death, this.OnDeath, this);
    }

    async initStateMachine(fsm: new () => StateMachine) {
        this.fsm = this.addComponent(fsm);
        await this.fsm.init();
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.Death, this.OnDeath, this);
    }

    protected update(dt: number): void {
        this.node.setPosition((this.position.x - 1.5) * TILE_WIDTH, -(this.position.y - 1.5) * TILE_HEIGHT);
    }

    // TODO 有的实体并不需要攻击，可以设计成接口
    protected tryAttackTarget(target: EntityManager, attackDistance: number) {
        if (Vec2.distance(this.position, target.position) <= attackDistance) {
            this.state = EEntityState.Attack;

            EventManager.instance.emit(EEvent.Death, target, this);
        }
    }

    protected OnDeath(target: EntityManager, Instigator: EntityManager) {
        if (target === this) {
            this.state = EEntityState.Death;
        }
    }

    protected setTileInfo(bMovable: boolean, bWeaponBlocked: boolean) {
        const tile = DataManager.instance.tileInfo?.[this.position.x]?.[this.position.y];
        if (tile) {
            tile.bMovable = bMovable;
            tile.bWeaponBlocked = bWeaponBlocked;
        }
    }

    protected setTileVisibility(bShow: boolean) {
        const tile = DataManager.instance.tileInfo?.[this.position.x]?.[this.position.y];
        if (tile) {
            const spriteComponent = tile.node.getComponent(Sprite);
            if (spriteComponent) {
                const color = spriteComponent.color.clone();
                color.a = bShow ? 255 : 0;
                spriteComponent.color = color;
            }
        }
    }
}
