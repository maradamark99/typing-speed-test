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

  isFocused: boolean = false;
  countFrom: number = 60;
  currentTime?: number; 
  timerSubscription?: Subscription;

  
  constructor(public readonly wordService: WordService, public readonly timerService: TimerService) { 
  }

  onIsFinished(value: boolean) {
    if (value) {
      this.currentTime = this.countFrom;
    }
  }

  
  onFocusChange(value: boolean) {
    this.isFocused = value;
    if (value && !this.timerSubscription) {
      this.timerSubscription = this.timerService.startCountDownTimer(this.countFrom).subscribe((time) => this.currentTime = time);
    } else if (!value && this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
