import { animation, AnimationClip, Sprite, SpriteFrame } from 'cc';

import ResourceManager from '../Runtime/ResourceManager';
import { StateMachine } from './StateMachine';

export class State {
    private animationClip: AnimationClip;

    constructor(
        private path: string,
        private fsm: StateMachine,
        private wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal,
        private sampleRate: number = 8,
        private events: AnimationClip.IEvent[] = [],
    ) {
    }

    async init() {
        const spriteFrames = await ResourceManager.loadDir(this.path, SpriteFrame);

        // 异步加载的精灵帧顺序不一定，所以需要按数字顺序对精灵帧进行排序
        spriteFrames.sort((a, b) => parseInt(a.name.match(/\d+/)[0]) - parseInt(b.name.match(/\d+/)[0]));

        const keyframes = spriteFrames.map((spriteFrame, index): [number, SpriteFrame] => [1 / this.sampleRate * index, spriteFrame]);

        this.animationClip = new AnimationClip(this.path);
        this.animationClip.duration = 1 / this.sampleRate * spriteFrames.length;
        this.animationClip.wrapMode = this.wrapMode;
        this.animationClip.events = this.events;

        const track = new animation.ObjectTrack();
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame');
        track.channel.curve.assignSorted(keyframes);
        this.animationClip.addTrack(track);
    }

    run() {
        if (!this.animationClip || this.fsm.animationComponent.defaultClip?.name === this.animationClip.name) {
            return;
        }

        this.fsm.animationComponent.defaultClip = this.animationClip;
        this.fsm.animationComponent.play();
    }
}
