import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service'
import {Router} from "@angular/router";

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

  constructor(public readonly service: DataService, private readonly router: Router) {
  }


  ngOnInit() {
    this.service.subscription = this.service.getWords().subscribe(data => (this.service.words = data));
  }

  ngOnDestroy() {
    this.service.subscription?.unsubscribe();
  }


  calculateCurrentWpm(): Number | string {
    const wpm = ((this.numOfTypedChar / 5) / ((60 - this.timer) / 60))
    return isNaN(wpm) ? 0 : wpm.toFixed(2);
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

      this.input = this.service.words[this.index];
      if (this.input === this.service.words[this.index]) { //TEST NEEDED
        this.numOfCorrect--;
      }
    }
  }

  checkInput() {
    if (this.input.trim() === "")
      return
    this.input = this.input.trim();
    this.numOfTypedChar += this.input.trim().length;
    if (this.input === this.service.words[this.index]) {
      this.numOfCorrect++;
    }
    if (this.index < this.service.words.length)
      this.index++;
    this.input = "";
  }

  newGame() {
    this.index = 0
    this.numOfTypedChar = 0
    this.numOfCorrect = 0
    this.isTimeOver = false
    this.timer = 60
  }

  redirect() {
    this.router.navigate(['/home']).then()
  }
}



