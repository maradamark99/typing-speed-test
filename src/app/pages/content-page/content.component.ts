import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service'
import {Router} from "@angular/router";
import { DatePipe } from '@angular/common';
import {TokenService} from "../../services/token.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'pageContent',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {
  timerStarted = false;
  numOfCorrect = 0;
  numOfTypedChar = 0;
  index = 0;
  input = "";
  timer = 60;
  isTimeOver = false;
  previousWords: string[] = [];
  subscription1?: Subscription;
  subscription2?: Subscription;


  constructor(public readonly service: DataService, private readonly router: Router,
              private readonly datePipe: DatePipe, private readonly tokenService: TokenService) { }


  ngOnInit() {
    this.subscription1 = this.service.getWords().subscribe(data => (this.service.words = data));
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe()
  }


  calculateCurrentWpm() {
    const wpm = ((this.numOfTypedChar / 5) / ((60 - this.timer) / 60));
    return isNaN(wpm) ? 0 : wpm;
  }

  decreaseTime() {
    if (this.timerStarted)
      return
    this.timerStarted = true;
    setInterval(() => {
      if (this.timer === 0) {
        this.isTimeOver = true
        return
      }
      this.timer--
    }, 1000);
  }

  goBack() {
    if (this.index > 0 && this.input === "") {
      this.index--;
      this.input = this.previousWords[this.index];
      this.previousWords.pop();
      if (this.input === this.service.words[this.index]) {
        this.numOfCorrect--;
      }
    }
  }

  checkInput() {
    console.log(this.previousWords)
    if (this.input.trim() === "")
      return
    this.input = this.input.trim();
    this.numOfTypedChar += this.input.trim().length;
    this.previousWords.push(this.input);
    if (this.input === this.service.words[this.index]) {
      this.numOfCorrect++;
    }
    if (this.index < this.service.words.length)
      this.index++;
    this.input = "";
  }

  newGame() {
    this.input = ""
    this.index = 0
    this.numOfTypedChar = 0
    this.numOfCorrect = 0
    this.isTimeOver = false
    this.timer = 60
  }

  redirect() {
    this.router.navigate(['/home']).then()
  }

  saveResult()
  {
    if(!this.tokenService.checkToken()){
      return null
    }
    const token = this.tokenService.getDecodedToken()
    const username = token.sub
    const date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd, h:mm:ss a')
    return {
      username: username,
      wpm: this.calculateCurrentWpm(),
      accuracy: this.numOfCorrect / this.index,
      date: date!
    };
  }
  send(){
    if(!this.saveResult()){
      return
    }
    this.subscription2 = this.service.sendResult(this.saveResult()!).subscribe()
    this.newGame()
  }

  cancel() {
    this.newGame()
  }
}



