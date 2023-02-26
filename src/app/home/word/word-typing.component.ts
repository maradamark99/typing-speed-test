import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LinkedList } from 'linked-list-typescript';
import { WordService } from 'src/app/services/word.service';


@Component({
  selector: 'app-word-typing',
  templateUrl: './word-typing.component.html',
  styleUrls: ['./word-typing.component.scss']
})
export class WordTypingComponent implements OnInit {
  @Output('focusChange') focusChange = new EventEmitter<boolean>();
  public originalWords?: string[];
  public currentWords?: LinkedList<string>;
  public previousWords?: LinkedList<string>;
  private isFocused = false;
  input: string = "";

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.getWords();
    this.currentWords = new LinkedList<string>(...this.originalWords!);
    this.previousWords = new LinkedList<string>();
    this.previousWords.append("")
  }

  public onKeyPress(event: KeyboardEvent): void {
    if (this.wordService.wordIndex == this.originalWords?.length)
      return;
    if (!this.isAValidKey(event.key))
      return;
    
    this.input += event.key;
    if (this.isInputEqualToCurrentWord()) {
      this.wordService.numberOfTypedChar++;
      this.updateCurrentWords(this.currentWords!.head.substring(1));
      if(this.wordService.charIndex < this.originalWords![this.wordService.wordIndex].length)
        this.wordService.charIndex++; 
    }
    this.updatePreviousWords(this.previousWords?.tail + event.key);
  }

  public onBackspaceKeyPress() {
    if (this.wordService.charIndex == 0 && this.input.length < 1) return;

    if (this.isInputEqualToCurrentWord()) {
      this.wordService.charIndex--;
      this.updateCurrentWords(this.input[this.wordService.charIndex] + this.currentWords!.head);
    } 
    let tail = this.previousWords!.tail;
    this.updatePreviousWords(tail.substring(0, tail.length - 1));
    this.input = this.input.substring(0, this.input.length - 1);
  }

  public onSpaceKeyPress(): void {
    if (this.input.trim().length < 1)
      return;
    if (this.input == this.originalWords![this.wordService.wordIndex])
      this.wordService.numberOfCorrect++;
    this.currentWords!.removeHead();
    this.wordService.charIndex = 0;
    this.wordService.wordIndex++;
    this.previousWords?.append("");
    this.input = "";
  } 

  private isInputEqualToCurrentWord(): boolean {
    return this.input
      == this.originalWords![this.wordService.wordIndex].substring(0, this.input.length) 
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
    return !(key < 'a' || key > 'z');
  }

  private getWords() {
    this.originalWords = this.wordService.getWords();
  }

  public inputInFocus() {
    this.isFocused = true;
    this.focusChange?.emit(this.isFocused);
  }

}
