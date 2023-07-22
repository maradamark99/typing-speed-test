export interface Sort {
    field: string;
    direction: SortDirection;
}

export enum SortDirection {
    DEFAULT, 
    ASC = "asc",
    DESC = "desc"
}