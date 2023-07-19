import { Injectable } from '@angular/core';
import { interval, scan, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  public startCountDownTimer(countFromInSeconds: number) {
		return interval(1000)
			.pipe(scan((timeLeft) => timeLeft - 1, countFromInSeconds),
				takeWhile((timeLeft) => timeLeft >= 0)
			);
	}

	public startCountUpTimer(countToInSeconds: number) {
		return interval(1000)
			.pipe(takeWhile((time) => time < countToInSeconds));
	}
  
}
