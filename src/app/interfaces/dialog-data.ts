import ResultRequest from "./result-request";

export interface DialogData extends ResultRequest {
    message: string;
    numOfCorrect: number;
    wordAmount: number;
}