import { director, RenderRoot2D } from 'cc';

import Singleton from '../Base/Singleton';
import { DEFAULT_FADE_DURATION, DrawManager } from '../Scripts/UI/DrawManager';
import { CreateUINode } from '../Utils';

export default class FaderManager extends Singleton {
    static get instance() {
        return super.getInstance<FaderManager>();
    }

    private _fader: DrawManager = null;

    get fader() {
        if (this._fader !== null) {
            return this._fader;
        }

        const root = CreateUINode('persistRoot');
        root.addComponent(RenderRoot2D);

        const node = CreateUINode('fader');
        node.setParent(root);
        this._fader = node.addComponent(DrawManager);
        this._fader.init();

        director.addPersistRootNode(root);

        return this._fader;
    }

    async fadeIn(duration: number = DEFAULT_FADE_DURATION) {
        await this.fader.fadeIn(duration);
    }

    async fadeOut(duration: number = DEFAULT_FADE_DURATION) {
        await this.fader.fadeOut(duration);
    }
}
