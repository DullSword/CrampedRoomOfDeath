import { _decorator, Component, Event } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { EInput, EEvent } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handleController(evt: Event, controll: EInput) {
        EventManager.instance.emit(EEvent.PlayerInput, controll);
    }
}


