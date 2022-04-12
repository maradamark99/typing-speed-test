import { Injectable} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResult } from "../interfaces/IResult";

@Injectable({
    providedIn: 'root',
})
export class DataService{

    words: string[] = [];
    private readonly wordApiUrl = 'https://random-word-api.herokuapp.com/word?number=200';
    private readonly apiUrl = "http://localhost:8080/api/v1/"
    subscription?: Subscription;

    constructor(private readonly http: HttpClient) { }

    getWords() {
        return this.http.get<string[]>(this.wordApiUrl);
    }

    getLeaderboard(){
      return this.http.get<IResult[]>(this.apiUrl + "results");
    }
}
