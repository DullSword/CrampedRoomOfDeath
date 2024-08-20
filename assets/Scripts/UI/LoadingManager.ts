import { Component, _decorator, ProgressBar, resources, director } from 'cc';
const { ccclass, property } = _decorator;

import { EScene } from '../../Enums';

@ccclass('LoadingManager')
export class LoadingManager extends Component {

    @property(ProgressBar)
    progressBar: ProgressBar = null;

    protected onLoad(): void {
        resources.preloadDir(
            'texture',
            (finished: number, total: number) => {
                if (this.progressBar) {
                    this.progressBar.progress = finished / total;
                }
            },
            (err: null | Error) => {
                if (!err) {
                    director.loadScene(EScene.Start);
                } else {
                    console.error(err);
                }
            })
    }
}
