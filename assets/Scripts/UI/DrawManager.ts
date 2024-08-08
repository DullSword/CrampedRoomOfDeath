import { BlockInputEvents, Color, Component, game, Graphics, UITransform, view, _decorator } from 'cc';
const { ccclass } = _decorator;

import { FadeStatus } from '../../Enums';

const SCREEN_WIDTH = view.getVisibleSize().width;
const SCREEN_HEIGHT = view.getVisibleSize().height;

export const DEFAULT_FADE_DURATION = 200;

@ccclass('DrawManager')
export class DrawManager extends Component {

    lastTime: number = 0;
    duration: number = DEFAULT_FADE_DURATION;

    fadeStatus: FadeStatus = FadeStatus.Idle;
    fadeResolve: (value?: void | PromiseLike<void>) => void;
    faderNode: Node = null;

    graphicsComponent: Graphics = null;
    blockInputEventsComponent: BlockInputEvents = null;

    init() {
        this.blockInputEventsComponent = this.addComponent(BlockInputEvents);

        this.graphicsComponent = this.addComponent(Graphics);

        const transform = this.getComponent(UITransform);
        transform.setAnchorPoint(0.5, 0.5);
        transform.setContentSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        this.setAlpha(1);
    }

    private setAlpha(percent: number) {
        this.graphicsComponent.clear();
        this.graphicsComponent.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.graphicsComponent.fillColor = new Color(0, 0, 0, 255 * percent);
        this.graphicsComponent.fill();

        this.blockInputEventsComponent.enabled = percent !== 0;
    }

    update() {
        const percent = (game.totalTime - this.lastTime) / this.duration;

        switch (this.fadeStatus) {
            case FadeStatus.fadeIn:
                if (percent < 1) {
                    this.setAlpha(percent);
                } else {
                    this.fadeStatus = FadeStatus.Idle;
                    this.setAlpha(1);
                    this.fadeResolve();
                }
                break;
            case FadeStatus.fadeOut:
                if (percent < 1) {
                    this.setAlpha(1 - percent);
                } else {
                    this.fadeStatus = FadeStatus.Idle;
                    this.setAlpha(0);
                    this.fadeResolve();
                }
                break;
            default:
                break;
        }
    }

    // fadeIn 逐渐进入黑幕
    fadeIn(duration: number = DEFAULT_FADE_DURATION) {
        this.setAlpha(0);
        this.duration = duration;
        this.fadeStatus = FadeStatus.fadeIn;
        this.lastTime = game.totalTime;

        return new Promise(resolve => {
            this.fadeResolve = resolve;
        });
    }

    // fadeOut 逐渐退出黑幕
    fadeOut(duration: number = DEFAULT_FADE_DURATION) {
        this.setAlpha(1);
        this.duration = duration;
        this.fadeStatus = FadeStatus.fadeOut;
        this.lastTime = game.totalTime;

        return new Promise(resolve => {
            this.fadeResolve = resolve;
        })
    }
}
