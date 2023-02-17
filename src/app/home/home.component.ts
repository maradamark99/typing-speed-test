import { Component, OnInit } from '@angular/core';
import { LinkedList } from 'linked-list-typescript';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private originalWords?: Array<String>;
  public currentWords?: LinkedList<String>;
  public previousWords?: LinkedList<String>;
  charIndex?: number;
  wordIndex?: number;

	constructor() { 
	}

  ngOnInit(): void {
		// for testing purposes
    this.originalWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "lorem",
      "ipsum", "dolor", "sit", "amet", "consectetur", "lorem", "ipsum", "dolor",
      "sit", "amet", "consectetur", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];
    this.currentWords = new LinkedList<String>(...this.originalWords);
    this.previousWords = new LinkedList<String>();
    this.previousWords.append("")
    this.charIndex = 0;
    this.wordIndex = 0;
  }

  checkInput(event: KeyboardEvent, value: string): void {
    if (event.key.trim().length < 1)
      return
        
    let prevWord = this.previousWords!.removeTail() + event.key;
    this.previousWords?.append(prevWord);
    let newWord = this.currentWords!.removeHead().substring(1);
    this.currentWords!.prepend(newWord);
    
    if(this.isCharIndexSmallerThanCurrentWordLength())
      this.charIndex!++;  
  }

  nextWord(value: string): void {
    if (value.trim().length < 1)
      return;
    this.currentWords!.removeHead();
    this.charIndex = 0;
    this.wordIndex!++
    this.previousWords?.append("")
  } 

  private isCharIndexSmallerThanCurrentWordLength() {
    return this.charIndex! < this.originalWords![this.wordIndex!].length - 1;
  }

}
