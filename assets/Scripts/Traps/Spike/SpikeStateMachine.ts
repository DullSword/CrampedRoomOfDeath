import { _decorator, Animation, AnimationState } from 'cc';

import { TrapStateMachine } from '../TrapStateMachine';
import { EEntityStateMachineParams, EEvent } from '../../../Enums';
import EventManager from '../../../Runtime/EventManager';
import { numberToWord } from '../../../Utils';

// 刺的数量为 totalPoint - 1
const getBaseUrl = (totalPoint: number) => `texture/spikes/spikes${numberToWord[totalPoint - 1]}`;

export class SpikeStateMachine extends TrapStateMachine {

    async init(...args: any[]) {
        const [trapManager, totalPoint] = args;
        const baseUrl = getBaseUrl(totalPoint);
        await super.init({ trapManager, baseUrl, totalPoint });
    }

    initAnimationEvent() {
        this.animationComponent.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
            const currentPoint = this.getParamValue(EEntityStateMachineParams.CurrentPoint);
            if (currentPoint === this.totalPoint) {
                EventManager.instance.emit(EEvent.ResetTrapPoint, this.trapManager);
            }
        }, this);
    }
}
