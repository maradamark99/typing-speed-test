import Result from "./result";

export interface DialogData extends Result {
    numOfCorrect: number;
    wordAmount: number;
}