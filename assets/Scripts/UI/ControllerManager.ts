import { _decorator, Component, Node } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { ELevelEvent } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handleController() {
        EventManager.instance.emit(ELevelEvent.NextLevl);
    }
}


