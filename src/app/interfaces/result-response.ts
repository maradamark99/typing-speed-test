import Result from "./result";

export interface ResultResponse extends Result {
    username: string;
    timestamp: string;
}