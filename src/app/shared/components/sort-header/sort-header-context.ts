import { Injectable } from "@angular/core";

@Injectable()
export default class SortHeaderContext {
    private map: Map<string, number>;

    constructor() {
        this.map = new Map<string, number>();
    }

    get(key: string): number {
        return this.map.get(key)!;
    }

    set(key: string, value: number): void {
        this.map.set(key, value);
    }
}