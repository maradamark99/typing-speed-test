import { Component, OnInit } from '@angular/core';
import { LinkedList } from 'linked-list-typescript';
import { WordService } from 'src/app/services/word.service';


@Component({
  selector: 'app-word-typing',
  templateUrl: './word-typing.component.html',
  styleUrls: ['./word-typing.component.scss']
})
export class WordTypingComponent implements OnInit {
  public originalWords?: string[];
  public currentWords?: LinkedList<string>;
  public previousWords?: LinkedList<string>;
  charIndex: number = 0;
  wordIndex: number = 0;
  input: string = "";

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.getWords();
    this.currentWords = new LinkedList<string>(...this.originalWords!);
    this.previousWords = new LinkedList<string>();
    this.previousWords.append("")
  }

  public onKeyPress(event: KeyboardEvent): void {
    if (!this.isAValidKey(event.key))
      return;
    
    this.input += event.key;
    if (this.isInputEqualToCurrentWord()) {
      this.updateCurrentWords(this.currentWords!.head.substring(1));
      if(this.charIndex < this.originalWords![this.wordIndex].length)
        this.charIndex++; 
    }
    this.updatePreviousWords(this.previousWords?.tail + event.key);
  }

  public onBackspaceKeyPress() {
    if (this.charIndex == 0 && this.input.length < 1) return;

    if (this.isInputEqualToCurrentWord()) {
      this.charIndex--;
      this.updateCurrentWords(this.input[this.charIndex] + this.currentWords!.head);
    } 
    let tail = this.previousWords!.tail;
    this.updatePreviousWords(tail.substring(0, tail.length - 1));
    this.input = this.input.substring(0, this.input.length - 1);
  }

  public onSpaceKeyPress(): void {
    if (this.input.trim().length < 1)
      return;
    this.currentWords!.removeHead();
    this.charIndex = 0;
    this.wordIndex++;
    this.previousWords?.append("");
    this.input = "";
  } 

  private isInputEqualToCurrentWord(): boolean {
    return this.input
      == this.originalWords![this.wordIndex].substring(0, this.input.length) 
  }

  private updatePreviousWords(newValue: string): void {
    this.previousWords!.removeTail();
    this.previousWords!.append(newValue);
  }

  private updateCurrentWords(newValue: string): void {
    this.currentWords!.removeHead();
    this.currentWords!.prepend(newValue);
  }

  private isAValidKey(key: string): boolean{
    return !(key.trim().length < 1 || key < 'a' || key > 'z');
  }

  private getWords() {
    this.originalWords = this.wordService.getWords();
  }

}
