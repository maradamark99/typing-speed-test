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

  public calculateAccuracy(): number {
    return this.wordIndex == 0 ? 0 : +((this.numberOfCorrect / this.wordIndex * 100).toFixed(2));
  }

  public calculateWordsPerMinute(timeLeftInSeconds: number): number {
    if (this.numberOfTypedChar === 0 || timeLeftInSeconds === 60)
      return 0;
    const wpm = ((this.numberOfTypedChar / 5) / ((60 - timeLeftInSeconds) / 60));
    return +wpm.toFixed(2);
  }

  public getWords(): string[] {
    return ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];
  }

  public resetState(): void {
    this.charIndex = 0;
    this.wordIndex = 0;
    this.numberOfTypedChar = 0;
    this.numberOfCorrect = 0;
  }

}
