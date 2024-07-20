import { Asset, resources } from "cc";
import Singleton from "../Base/Singleton";

export default class ResourceManager extends Singleton {
    static get instance() {
        return super.getInstance<ResourceManager>();
    }

    static loadDir<T extends Asset>(path: string, type: new () => T) {
        return new Promise<T[]>((resolve, reject) => {
            resources.loadDir(path, type, function (err, assets) {
                if (err) {
                    reject(err);
                }
                resolve(assets);
            });
        })
    }
}