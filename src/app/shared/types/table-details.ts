import { PaginationDetails } from "./pagination-details"

export type TableDetails = {
    rowActions?: Set<Action>,
    isSortable: boolean,
    paginationDetails?: PaginationDetails
    noDataMessage?: string
}

export enum Action {
    EDIT,
    DELETE
}