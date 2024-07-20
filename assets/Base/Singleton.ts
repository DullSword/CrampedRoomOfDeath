
export default class Singleton {
    private static _instance: any = null;
    protected static getInstance<T extends Singleton>(): T {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
}