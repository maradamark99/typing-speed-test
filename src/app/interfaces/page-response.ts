import { PaginationInfo } from "./pagination-info";

export interface PageResponse<T> extends PaginationInfo {
    content: T[];
}