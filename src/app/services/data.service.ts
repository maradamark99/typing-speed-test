import { Injectable} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResult } from "../interfaces/IResult";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class DataService{

    words: string[] = [];
    subscription?: Subscription;

    constructor(private readonly http: HttpClient) { }

    getWords() {
        return this.http.get<string[]>(environment.wordApiUrl + "?number=200");
    }

    getLeaderboard(){
      return this.http.get<IResult[]>(environment.apiUrl + "/results");
    }

    sendResult(result: IResult){
      return this.http.post<IResult>(environment.apiUrl + "/results", result, {headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          })});
    }
}
