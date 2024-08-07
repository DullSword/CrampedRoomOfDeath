import { _decorator } from 'cc';

import { TrapStateMachine } from '../TrapStateMachine';

export class BurstStateMachine extends TrapStateMachine {

    async init(...args: any[]) {
        const [totalPoint] = args;
        await super.init({ baseUrl: 'texture/burst', totalPoint });
    }
}
