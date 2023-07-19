import { ResultBase } from "./result-base";

export interface DialogData extends ResultBase {
    message: string;
    numOfCorrect: number;
    wordAmount: number;
}