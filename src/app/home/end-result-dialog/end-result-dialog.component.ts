import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResultBase } from 'src/app/shared/interfaces/result-base';

type DialogData = ResultBase & { message: string, numOfCorrect: number, wordAmount: number}

@Component({
  selector: 'app-end-modal',
  templateUrl: './end-result-dialog.component.html',
  styleUrls: ['./end-result-dialog.component.scss']
})
export class EndResultDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}