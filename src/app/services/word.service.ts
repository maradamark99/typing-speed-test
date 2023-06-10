import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  charIndex: number = 0;
  wordIndex: number = 0;
  numberOfTypedChar: number = 0;
  numberOfCorrect: number = 0;

  constructor() { }

  calculateAccuracy(): number {
    return this.wordIndex == 0 ? 0 : +((this.numberOfCorrect / this.wordIndex * 100).toFixed(2));
  }

  calculateWordsPerMinute(timeLeftInSeconds: number): number {
    const wpm = ((this.numberOfTypedChar / 5) / ((60 - timeLeftInSeconds) / 60));
    return +((isNaN(wpm) || !isFinite(wpm) ? 0 : wpm).toFixed(2));
  }

  getWords(): string[] {
    return ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];
  }

  resetProperties() {
    this.charIndex = 0;
    this.wordIndex = 0;
    this.numberOfTypedChar = 0;
    this.numberOfCorrect = 0;
  }

}
