import { Injectable} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class DataService{

    words: string[] = [];
    url = 'https://random-word-api.herokuapp.com/word?number=200';
    subscription?: Subscription;

    constructor(private readonly http: HttpClient) { }

    getWords() {
        return this.http.get<string[]>(this.url);
    }
}
