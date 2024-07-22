import { animation, AnimationClip, Sprite, SpriteFrame } from 'cc';

import ResourceManager from '../Runtime/ResourceManager';
import { PlayerStateMachine } from '../Scripts/Player/PlayerStateMachine';

export class State {
    private animationClip: AnimationClip;

    constructor(
        private path: string,
        private fsm: PlayerStateMachine,
        private wrapMode: AnimationClip.WrapMode = AnimationClip.WrapMode.Normal,
        private sampleRate: number = 8
    ) {
    }

    async init() {
        const spriteFrames = await ResourceManager.loadDir(this.path, SpriteFrame);
        const keyframes = spriteFrames.map((spriteFrame, index): [number, SpriteFrame] => [1 / this.sampleRate * index, spriteFrame]);

        this.animationClip = new AnimationClip();
        this.animationClip.duration = 1 / this.sampleRate * spriteFrames.length;
        this.animationClip.wrapMode = this.wrapMode;

        const track = new animation.ObjectTrack();
        track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame');
        track.channel.curve.assignSorted(keyframes);
        this.animationClip.addTrack(track);
    }

    run() {
        this.fsm.animationComponent.defaultClip = this.animationClip;
        this.fsm.animationComponent.play();
    }
}
