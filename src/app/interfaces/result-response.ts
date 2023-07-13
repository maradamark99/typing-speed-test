import Result from "./result";

export interface ResultResponse extends Result {
    id: number;
    username: string;
    timestamp: string;
}