import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LinkedList } from 'linked-list-typescript';
import { WordService } from 'src/app/services/word.service';
import { EndResultDialogComponent } from '../end-result-dialog/end-result-dialog.component';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-word-typing',
  templateUrl: './word-typing.component.html',
  styleUrls: ['./word-typing.component.scss']
})
export class WordTypingComponent {
  @Input('timeLeft') timeLeft?: number;
  @Output('isFocusChanged') isFocusChanged = new EventEmitter<boolean>();
  @Output('isFinished') isFinished = new EventEmitter<boolean>();
  public originalWords: string[];
  public currentWords: LinkedList<string>;
  public previousWords: LinkedList<string>;
  private isFocused = false;
  input: string = "";

  constructor(
    private wordService: WordService,
    private resultService: ResultService,
    private dialog: MatDialog) {
      this.originalWords = this.wordService.getWords();
      this.currentWords = new LinkedList<string>(...this.originalWords!);
      this.previousWords = new LinkedList<string>();
      this.previousWords.append("");
    }

  ngOnChanges(): void {
    if (this.timeLeft! < 1)
      this.openDialog();
  }

  public handleKeyPress(event: KeyboardEvent): void {
    if (this.wordService.wordIndex == this.originalWords?.length
        || !this.isAValidKey(event.key))
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

  public handleBackspaceKeyPress() {
    if (this.wordService.charIndex == 0 && this.input.length < 1) return;

    if (this.isInputEqualToCurrentWord()) {
      this.wordService.charIndex--;
      this.updateCurrentWords(this.input[this.wordService.charIndex] + this.currentWords!.head);
    } 
    let tail = this.previousWords!.tail;
    this.updatePreviousWords(tail.substring(0, tail.length - 1));
    this.input = this.input.substring(0, this.input.length - 1);
  }

  public handleSpaceKeyPress(): void {
    if (this.input.trim().length < 1)
      return;
    if (this.wordService.wordIndex === this.originalWords!.length - 1) {
      this.openDialog();
    }
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

  public isInputInFocus() {
    this.isFocused = true;
    this.isFocusChanged?.emit(this.isFocused);
  }

  private openDialog() {
    const wpm = this.wordService.calculateWordsPerMinute(this.timeLeft!);
    const accuracy = this.wordService.calculateAccuracy();

    const dialogRef = this.dialog.open(EndResultDialogComponent, {
      data: {
        wpm: wpm,
        accuracy: accuracy, 
        numOfCorrect: this.wordService.numberOfCorrect,
        wordAmount: this.originalWords!.length - 1 
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.resultService.save({ wpm: wpm, accuracy: accuracy })
      }
      this.resetProperties();
    })
  }

  private resetProperties(): void {
    this.originalWords = this.wordService.getWords().reverse();
    this.currentWords = new LinkedList<string>(...this.originalWords!);
    this.previousWords = new LinkedList<string>();
    this.previousWords.append("");
    this.wordService.resetProperties();
    this.input = "";
    this.isFinished.emit(true);
  }

}
