import { Injectable} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResult } from "../interfaces/IResult";
import {environment} from "../../environments/environment";
import {TokenService} from "./token.service";

@Injectable({
    providedIn: 'root',
})
export class DataService{

    words: string[] = [];
    results: IResult[] = [];

    constructor(private readonly http: HttpClient, private readonly tokenService: TokenService) { }

    getWords() {
        return this.http.get<string[]>(environment.wordApiUrl + "?number=200");
    }

    getMyLeaderboard() {
        const username = this.tokenService.getDecodedToken().sub
        return this.http.get<IResult[]>(environment.apiUrl + `/results/${username}`);
    }

    getLeaderboard(){
      return this.http.get<IResult[]>(environment.apiUrl + "/results");
    }

    sendResult(result: IResult){
      return this.http.post<IResult>(environment.apiUrl + "/results", result, {headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${this.tokenService.getToken()}`,
            'Content-Type': 'application/json'
          })});
    }
}
