import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  readonly countFrom: number = 60;
  currentTime?: number; 
  timerSubscription: Subscription = Subscription.EMPTY;

  constructor(public readonly wordService: WordService, public readonly timerService: TimerService) { 
  }

  handleIsFinished(value: boolean) {
    if (value) {
      this.unSubscribeFromTimer();
      this.currentTime = this.countFrom;
    }
  }

  handleFocusChange(value: boolean) {
    if (value && this.timerSubscription === Subscription.EMPTY) {
      this.timerSubscription = this.timerService.startCountDownTimer(this.countFrom).subscribe((time) => this.currentTime = time);
    } else if (!value && this.timerSubscription) {
      this.unSubscribeFromTimer();
    }
  }

  private unSubscribeFromTimer() {
    this.timerSubscription!.unsubscribe();
    this.timerSubscription = Subscription.EMPTY
  }

}
