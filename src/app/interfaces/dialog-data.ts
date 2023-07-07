import Result from "./result";

export interface DialogData extends Result {
    message: string;
    numOfCorrect: number;
    wordAmount: number;
}