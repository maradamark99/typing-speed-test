import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private originalWords?: Array<String>;
  public currentWords?: Array<String>;
  public prevWords?: Array<String>;
  charIndex?: number;
  wordIndex?: number;
  test?: boolean;

	constructor() { 
	}

  ngOnInit(): void {
		// for testing purposes
    this.originalWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "Lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",];
    this.currentWords = [...this.originalWords];
    this.charIndex = 0;
    this.wordIndex = 0;
    this.prevWords = []
    this.prevWords![this.wordIndex] = "";

  }

  checkInput(value: KeyboardEvent): void {
    if (value.key.trim().length < 1)
      return
    this.test = value.key == this.originalWords![this.wordIndex!][this.charIndex!];
    this.prevWords![this.wordIndex!] += value.key
    this.currentWords![this.wordIndex!] = this.currentWords![this.wordIndex!].substring(1);
    if(this.charIndex! < this.originalWords![this.wordIndex!].length-1)
      this.charIndex!++;
    this.test = undefined;
  }

  nextWord(value: string): void {
    if (value.trim().length < 1)
      return;
    this.currentWords![this.wordIndex!] = "";
    this.charIndex = 0;
    this.wordIndex!++;
    this.prevWords![this.wordIndex!] = "";
  }

}
