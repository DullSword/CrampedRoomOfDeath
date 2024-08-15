import { Component, _decorator } from 'cc';
const { ccclass } = _decorator;

import { EEvent } from '../../Enums';
import EventManager from '../../Runtime/EventManager';

@ccclass('MenuManager')
export class MenuManager extends Component {
    Undo() {
        EventManager.instance.emit(EEvent.RevokeStep);
    }
}
