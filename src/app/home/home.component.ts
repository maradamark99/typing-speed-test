import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../shared/services/timer.service';
import { WordService } from '../shared/services/word.service';
import { DifficultyService } from '../shared/services/difficulty.service';
import { Difficulty } from '../shared/interfaces/difficulty';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly countFrom: number = 60;
  currentTime: number = this.countFrom;
  difficulties: Difficulty[] = [];
  timerSubscription: Subscription = Subscription.EMPTY;
  isSettingsDisabled: boolean = false;
  private _selectedDifficulty?: string;


  constructor(
    private readonly difficultyService: DifficultyService,
    public readonly wordService: WordService,
    public readonly timerService: TimerService) { 
  }

  ngOnInit(): void {
    this.difficultyService.getAll().subscribe({
      error: (e) => console.log(e),
      next: (result) => {
        this.difficulties = result;
        this._selectedDifficulty = this.difficulties[0].value;
      }
    })
  }

  get selectedDifficulty(): string {
    return this._selectedDifficulty ?? "";
  }

  setSelectedDifficulty(event: Event): void {
    if (!this.isSettingsDisabled) {
      this._selectedDifficulty = (event.target as HTMLSelectElement).value
    }
  }

  handleIsFinished(value: boolean) {
    if (value) {
      this.unSubscribeFromTimer();
      this.currentTime = this.countFrom;
    }
  }

  handleFocusChange(value: boolean) {
    this.isSettingsDisabled = value;
    if (value && this.timerSubscription === Subscription.EMPTY) {
      this.timerSubscription = this.timerService.startCountDownTimer(this.countFrom).subscribe((time) => this.currentTime = time);
    } else if (!value && this.timerSubscription) {
      this.unSubscribeFromTimer();
    }
  }

  getDifficultyFromValue(): Difficulty | undefined {
    return this.difficulties.filter(d => d.value === this.selectedDifficulty).pop();
  }

  private unSubscribeFromTimer() {
    this.timerSubscription!.unsubscribe();
    this.timerSubscription = Subscription.EMPTY
  }

}
