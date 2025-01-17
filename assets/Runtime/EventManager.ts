import Singleton from "../Base/Singleton";

export interface IEvent {
    func: Function;
    context: unknown;
}

export default class EventManager extends Singleton {

    private events: Map<string, IEvent[]> = new Map();
    static get instance() {
        return super.getInstance<EventManager>();
    }

    on(eventName: string, func: Function, context: unknown) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, [{ func, context }]);
        } else {
            this.events.get(eventName).push({ func, context });
        }
    }

    off(eventName: string, func: Function, context: unknown) {
        if (this.events.has(eventName)) {
            const index = this.events.get(eventName).findIndex(el => el.func === func && el.context === context);
            if (index !== -1) {
                this.events.get(eventName).splice(index, 1);
            }
        }
    }

    emit(eventName: string, ...args: unknown[]) {
        if (this.events.has(eventName)) {
            this.events.get(eventName).forEach(({ func, context }) => {
                func.apply(context ? context : null, args);
            });
        }
    }

    clear() {
        this.events.clear();
    }
}