import { Result } from "./result";

export type ResultResponse = Result & {
    id: number;
    username: string;
}