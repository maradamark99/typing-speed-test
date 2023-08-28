import { Injectable } from "@angular/core";
import { Sort } from "../../interfaces/sort";
import { SortDirection } from "../../enums/sort-direction";

@Injectable()
export default class SortHeaderContext {
    public readonly sortOrder = [SortDirection.DEFAULT, SortDirection.ASC, SortDirection.DESC];
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

    has(key: string): boolean {
        return this.map.has(key);
    }

    sortValues(): Sort[] {
        const values: Sort[] = []
        this.map.forEach((value: number, key: string) => {
            values.push({ field: key, direction: this.sortOrder[value] });
        });
        return values;
    }
}