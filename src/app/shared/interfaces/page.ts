import { PaginationInfo } from "./pagination-info";

export interface Page<T> extends PaginationInfo {
    content: T[];
}