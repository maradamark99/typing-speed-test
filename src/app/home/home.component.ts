import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public readonly words?: Array<String>;
  charIndex?: number;
  wordIndex?: number;
  test?: boolean

	constructor() { 
		// for testing purposes
    this.words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "Lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "Lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur",];
	}

  ngOnInit(): void {
    this.charIndex = 0;
    this.wordIndex = 0;
  }

  checkInput(value: string): void {
    this.test = value.toLowerCase() == this.words![this.wordIndex!][this.charIndex!].toLowerCase();
  }

}
