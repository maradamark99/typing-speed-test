import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from '../utils/api-path';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  charIndex: number = 0;
  wordIndex: number = 0;
  numberOfTypedChar: number = 0;
  numberOfCorrect: number = 0;

  constructor(private readonly http: HttpClient) { }

  public calculateAccuracy(): number {
    return this.wordIndex == 0 ? 0 : +((this.numberOfCorrect / this.wordIndex * 100).toFixed(2));
  }

  public calculateWordsPerMinute(timeLeftInSeconds: number): number {
    if (this.numberOfTypedChar === 0 || timeLeftInSeconds === 60)
      return 0;
    const wpm = ((this.numberOfTypedChar / 5) / ((60 - timeLeftInSeconds) / 60));
    return +wpm.toFixed(2);
  }

  public getWords(difficulty: string): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + ApiPath.WORDS + `/${difficulty}`);
  }

  public resetState(): void {
    this.charIndex = 0;
    this.wordIndex = 0;
    this.numberOfTypedChar = 0;
    this.numberOfCorrect = 0;
  }

}
