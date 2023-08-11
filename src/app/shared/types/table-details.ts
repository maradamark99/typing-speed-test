import { PaginationDetails } from "./pagination-details"

export type TableDetails = {
    rowActions?: RowAction[],
    isSortable: boolean,
    paginationDetails?: PaginationDetails
    noDataMessage?: string
}

export enum RowAction {
    EDIT,
    DELETE
}