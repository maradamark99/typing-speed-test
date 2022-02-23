import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'pageContent',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy{
    words: string[] = [];
    url = 'https://random-word-api.herokuapp.com/word?number=200';
    subscription?: Subscription;

    // this should be in a service class
    constructor(private http: HttpClient){ }
    getWords(){
        return this.http.get<string[]>(this.url);
    }
    ngOnInit(){
        this.subscription = this.getWords().subscribe(data => (this.words = data));
    }
    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

}



