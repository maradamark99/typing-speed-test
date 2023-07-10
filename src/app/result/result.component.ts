import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../services/result.service';
import { ResultResponse } from '../interfaces/result-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  private _results?: ResultResponse[];
  private subscription?: Subscription;
  public readonly displayedColumns = ['username', 'wpm', 'accuracy', 'timestamp']

  constructor(public readonly resultService: ResultService) { }

  get results(): ResultResponse[] {
    return this._results ? [...this._results!] : [];
  }

  ngOnInit(): void {
    this.subscription = this.resultService.getAll(0, 10).subscribe({
      error: (e) => console.log(e),
      next: (results) => this._results = results
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
