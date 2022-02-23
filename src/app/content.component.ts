import { Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pageContent',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {

    index: number = 0;
    input: string = "";
    words: string[] = ["hurl", "snub", "circle", "banish", "squash", "preparation", "shop",
        "rack", "understand", "cultural", "achieve", "speed", "play", "regular", "nose", "dedicate", "spontaneous",
        "depart", "favor", "chew", "cream", "need", "illness", "exit", "volunteer", "pupil", "killer", "motorist",
        "describe", "ask", "adoption", "cigarette", "affair", "transform", "cord", "shame", "studio", "twist",
        "reluctance", "bet", "manner", "trouble", "shine", "bolt", "racism", "engagement", "lake", "public", "joystick", "flash"];
    
    //TODO: create a service class for it, and fix the errors
    url = 'https://random-word-api.herokuapp.com/word?number=200';
    subscription?: Subscription;

    constructor(private http: HttpClient) { }
    getWords() {
        //return this.http.get<string[]>(this.url);
    }
    ngOnInit() {
        //this.subscription = this.getWords().subscribe(data => (this.words = data));
    }
    ngOnDestroy(): void {
        //this.subscription?.unsubscribe();
    }

    doThis(){
        console.log(this.input) 
        console.log(this.words[this.index]) 
        if(this.input === this.words[this.index]){
            console.log("yep")
        }  
        else{
            console.log("nope")
        }
        this.index++
    }

}   



