import { Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pageContent',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {

    numOfCorrect: number = 0;
    index: number = 0;
    input: string = "";
    /*words: string[] = ["hurl", "snub", "circle", "banish", "squash", "preparation", "shop",
        "rack", "understand", "cultural", "achieve", "speed", "play", "regular", "nose", "dedicate", "spontaneous",
        "depart", "favor", "chew", "cream", "need", "illness", "exit", "volunteer", "pupil", "killer", "motorist",
        "describe", "ask", "adoption", "cigarette", "affair", "transform", "cord", "shame", "studio", "twist",
        "reluctance", "bet", "manner", "trouble", "shine", "bolt", "racism", "engagement", "lake", "public", "joystick", "flash"];
    */
    //TODO: create a service class for this
    words: string[] = [];
    url = 'https://random-word-api.herokuapp.com/word?number=200';
    subscription?: Subscription;
    timer: number = 60;

    constructor(private http: HttpClient) { }
    getWords() {
        return this.http.get<string[]>(this.url);
    }

    ngOnInit() {
        this.subscription = this.getWords().subscribe(data => (this.words = data));
        setInterval(() => this.decreaseTime(), 1000);
    }

    ngOnDestroy(){
        this.subscription?.unsubscribe();
    }

    decreaseTime(){
        if(this.timer > 0)
            this.timer--;
    }

    goBack(){
        if(this.index > 0 && this.input === ""){
            this.index--;

            this.input = this.words[this.index];
            if(this.input === this.words[this.index]){ //TEST NEEDED
                this.numOfCorrect--;
            }
        }
    }

    checkInput(){
        if(this.input.trim() !== ""){
            this.input = this.input.trim()
            if(this.input === this.words[this.index]){ 
                this.numOfCorrect++;
            }
            if(this.index < this.words.length)  
                this.index++;
            this.input = "";
        }
    }

}   



