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
  currentWord: string = "";

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

  public checkInput(event: KeyboardEvent): void {
    this.currentWord += event.key;
    console.log(this.currentWord)
    if (this.validateInputKey(event.key)) {
      if (!this.isInputEqualToCurrent()) {
        this.createNewPreviousWord(event.key);
      }
      else {
        this.createNewCurrentWord(event.key);
        this.createNewPreviousWord(event.key); 
        if(this.isCharIndexSmallerThanCurrentWordLength())
          this.charIndex!++; 
      }
    }
  }

  public nextWord(): void {
    if (this.currentWord.trim().length < 1)
      return;
    this.currentWords!.removeHead();
    this.charIndex = 0;
    this.wordIndex!++;
    this.previousWords?.append("");
    this.currentWord = "";
  } 

  private isInputEqualToCurrent(): boolean {
    return this.currentWord.substring(0, this.charIndex!)
      == this.originalWords![this.wordIndex!].substring(0, this.charIndex!) 
  }

  private createNewPreviousWord(key: string): void {
    let newPrevious = this.previousWords!.removeTail() + key;
    this.previousWords!.append(newPrevious);
  }

  private createNewCurrentWord(key: string): void {
    let newCurrent = this.currentWords!.removeHead().substring(1);
    this.currentWords!.prepend(newCurrent);
  }

  private validateInputKey(inputKey: string): boolean{
    return !(inputKey.trim().length < 1 || inputKey < 'a' || inputKey > 'z');
  }

  private isCharIndexSmallerThanCurrentWordLength(): boolean {   
    return this.charIndex! < this.originalWords![this.wordIndex!].length - 1;
  }

}
