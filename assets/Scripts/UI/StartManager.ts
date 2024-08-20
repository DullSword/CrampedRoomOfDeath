import { Component, _decorator, director, Node } from 'cc';
const { ccclass } = _decorator;

import { EScene } from '../../Enums';
import FaderManager from '../../Runtime/FaderManager';

@ccclass('StartManager')
export class StartManager extends Component {
    protected onLoad(): void {
        FaderManager.instance.fadeOut(1000);

        director.preloadScene(EScene.Battle);

        this.node.once(Node.EventType.TOUCH_START, this.handleStart, this);
    }

    async handleStart() {
        await FaderManager.instance.fadeIn(300);

        director.loadScene(EScene.Battle);
    }
}
