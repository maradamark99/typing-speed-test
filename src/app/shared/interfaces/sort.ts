import { SortDirection } from "../enums/sort-direction";

export interface Sort {
    field: string;
    direction: SortDirection;
}
