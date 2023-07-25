export default class SortHeaderContext {
    private map: Map<string, number>;

    constructor(map: Map<string, number>) {
        this.map = map;
    }

    get(key: string): number {
        return this.map.get(key)!;
    }

    set(key: string, value: number): void {
        this.map.set(key, value);
    }
}