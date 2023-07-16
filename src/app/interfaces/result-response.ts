import { ResultBase } from "./result-base";

export interface ResultResponse extends ResultBase {
    id: number;
    username: string;
    timestamp: string;
}