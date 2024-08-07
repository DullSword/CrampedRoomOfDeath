import { _decorator } from 'cc';

import { TrapStateMachine } from '../TrapStateMachine';

const baseUrl = 'texture/burst';

export class BurstStateMachine extends TrapStateMachine {

    async init(...args: any[]) {
        const [trapManager, totalPoint] = args;
        await super.init({ trapManager, baseUrl, totalPoint });
    }

    initAnimationEvent(): void {
    }
}
