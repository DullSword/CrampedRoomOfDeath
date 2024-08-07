
import { EntityManager } from '../../Base/EntityManager';
import { StateMachine } from '../../Base/StateMachine';
import { EEntityStateMachineParams, EEntityType, EEvent, ETrapType } from '../../Enums';
import { ITrap } from '../../Levels';
import EventManager from '../../Runtime/EventManager';

export abstract class TrapManager extends EntityManager {

    protected trapType: ETrapType = null;
    protected triggerDistance: number = 0;

    // totalPoint: 从 0 点开始，初始状态和触发状态各占 1 个点，每有一个刺再加 1 点
    protected totalPoint: number = 0;
    private _currentPoint: number = 0;

    get currentPoint() {
        return this._currentPoint;
    }

    set currentPoint(value: number) {
        this._currentPoint = value;
        this.fsm.setParamValue(EEntityStateMachineParams.CurrentPoint, value);
    }

    async init(params: ITrap) {
        this.trapType = params.trapType;
        this.totalPoint = params.totalPoint;
        this.triggerDistance = params.triggerDistance ?? 0;

        await super.init({
            ...params,
            type: EEntityType.Trap,
        });

        this.currentPoint = 0;

        EventManager.instance.on(EEvent.playerActionCompleted, this.trigger, this);
    }

    async initStateMachine(fsm: new () => StateMachine) {
        this.fsm = this.addComponent(fsm);
        await this.fsm.init(this, this.totalPoint);
    }

    protected onDestroy(): void {
        EventManager.instance.off(EEvent.playerActionCompleted, this.trigger, this);

        super.onDestroy();
    }

    protected abstract trigger(): void;
}
