import { _decorator, Component, Event } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { EInputDirection, EInputEvent } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handleController(evt: Event, direction: EInputDirection) {
        EventManager.instance.emit(EInputEvent.Move, direction);
    }
}


