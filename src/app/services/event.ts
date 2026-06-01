import { Injectable, signal } from "@angular/core";
import { UsageEvent } from "../store/model/types";


@Injectable({
    providedIn: 'root'
})
export class EventService {
    private _events = signal<UsageEvent[]>([]);
    public readonly events = this._events.asReadonly()

    public logEvent(event: UsageEvent): void {
        this._events.update((events) => [...events, event]);
    }

    public getEvents(): UsageEvent[] {
        return this._events();
    }

    public clearEvents(): void {
        this._events.set([]);
    }

    public clearEventsBefore(timestamp: Date): void {
        this._events.update((events) =>
            events.filter(e => new Date(e.timestamp).getTime() > timestamp.getTime())
        );
    }
}