import { Component, Vec2, _decorator, game } from 'cc';
const { ccclass } = _decorator;

import EventManager from '../../Runtime/EventManager';
import { EEvent } from '../../Enums';

const DEFAULT_SHAKE_AMPLITUDE = 100;
const DEFAULT_SHAKE_FREQUENCY = 1;
const DEFAULT_SHAKE_INITIAL_PHASE = 0;

const DEFAULT_SHAKE_DURATION = 1000;

export interface IShakeParams {
    amplitude?: number;
    frequency?: number;
    initialPhase?: number;
    duration?: number;
}

@ccclass('ShakeManager')
export class ShakeManager extends Component {

    bIsShaking: boolean = false;
    lastTime: number = 0;
    lastPosition: Vec2 = new Vec2(0, 0);

    amplitude: number = DEFAULT_SHAKE_AMPLITUDE;
    frequency: number = DEFAULT_SHAKE_FREQUENCY;
    initialPhase: number = DEFAULT_SHAKE_INITIAL_PHASE;

    duration: number = DEFAULT_SHAKE_DURATION;

    onLoad() {
        EventManager.instance.on(EEvent.ScreenShake, this.play, this);
    }

    onDestroy() {
        EventManager.instance.on(EEvent.ScreenShake, this.play, this);

        super.destroy();
    }

    play(shakeParams: IShakeParams) {
        if (this.bIsShaking) {
            return;
        }

        this.bIsShaking = true;
        this.lastTime = game.totalTime;
        this.lastPosition = new Vec2(this.node.position.x, this.node.position.y);

        this.amplitude = shakeParams.amplitude ?? DEFAULT_SHAKE_AMPLITUDE;
        this.frequency = shakeParams.frequency ?? DEFAULT_SHAKE_FREQUENCY;
        this.initialPhase = shakeParams.initialPhase ?? DEFAULT_SHAKE_INITIAL_PHASE;
        this.duration = shakeParams.duration ?? DEFAULT_SHAKE_DURATION;
    }

    stop() {
        this.bIsShaking = false;
        this.node.setPosition(this.lastPosition.x, this.lastPosition.y);
    }

    update() {
        if (this.bIsShaking) {
            const currentTime = game.totalTime;
            const deltaTime = currentTime - this.lastTime;

            // 振动公式：A * sin(2πft + φ)
            // A * |sin(πft + φ)|，使其在一个周期内向一个方向偏移
            const offset = this.amplitude * Math.sin(Math.PI * this.frequency * (deltaTime / 1000) + this.initialPhase);
            const absoluteOffset = Math.abs(offset);

            this.node.setPosition(this.lastPosition.x + absoluteOffset, this.lastPosition.y);

            if (deltaTime > this.duration) {
                this.stop();
            }
        }
    }
}
