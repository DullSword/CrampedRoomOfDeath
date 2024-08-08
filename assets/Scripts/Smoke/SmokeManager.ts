import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { EntityManager } from '../../Base/EntityManager';
import { IEntity } from '../../Levels';
import { EEntityType } from '../../Enums';
import { SmokeStateMachine } from './SmokeStateMachine';

@ccclass('SmokeManager')
export class SmokeManager extends EntityManager {

    async init(params: IEntity) {
        await super.init({
            ...params,
            type: EEntityType.Smoke,
            fsm: SmokeStateMachine,
        });
    }
}
