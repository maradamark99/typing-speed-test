import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';
import { WordService } from '../services/word.service';
import { DifficultyService } from '../services/difficulty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly countFrom: number = 60;
  currentTime: number = this.countFrom;
  difficulties: string[] = [];
  timerSubscription: Subscription = Subscription.EMPTY;
  selectedDifficulty?: string;

  constructor(private readonly difficultyService: DifficultyService, public readonly wordService: WordService, public readonly timerService: TimerService) { 
  }
  ngOnInit(): void {
    this.difficultyService.getAll().subscribe({
      error: (e) => console.log(e),
      next: (result) => {
        this.difficulties = result.map((d) => d.value);
        this.selectedDifficulty = this.difficulties[0];
      }
    })
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
