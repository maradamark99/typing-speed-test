import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service'
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import { DatePipe } from '@angular/common';

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

  constructor(public readonly service: DataService, private readonly router: Router,
              private readonly jwtHelper: JwtHelperService, private readonly datePipe: DatePipe) {
  }


  ngOnInit() {
    this.service.subscription = this.service.getWords().subscribe(data => (this.service.words = data));
  }

  ngOnDestroy() {
    this.service.subscription?.unsubscribe();
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
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token')!)
    if(!token || this.jwtHelper.isTokenExpired(localStorage.getItem('token')!))
    {
      this.router.navigate(['/login']).then()
      return
    }
    const username: string = token.sub
    const date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd, h:mm:ss a')
    return {
      username: username,
      wpm: this.calculateCurrentWpm(),
      accuracy: this.numOfCorrect / this.index,
      date: date!
    };
  }
  send(){
    this.service.sendResult(this.saveResult()!).subscribe()
    this.newGame()
  }

  cancel() {
    this.newGame()
  }
}



