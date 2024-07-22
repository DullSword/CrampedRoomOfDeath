import { _decorator, Component, Event } from 'cc';
import EventManager from '../../Runtime/EventManager';
import { EControll, EEvent } from '../../Enums';
const { ccclass, property } = _decorator;

@ccclass('ControllerManager')
export class ControllerManager extends Component {
    handleController(evt: Event, controll: EControll) {
        EventManager.instance.emit(EEvent.PlayerControll, controll);
    }
}


