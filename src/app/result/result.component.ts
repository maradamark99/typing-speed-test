import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResultService } from '../services/result.service';
import { ResultResponse } from '../interfaces/result-response';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public readonly displayedColumns = ['username', 'wpm', 'accuracy', 'timestamp']
  public dataSource?: MatTableDataSource<ResultResponse>;

  constructor(public readonly resultService: ResultService) { }

  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.subscription = this.resultService.getAll(0, 10).subscribe({
      error: (e) => console.log(e),
      next: (results) => {
        this.dataSource = new MatTableDataSource(results)
        this.dataSource!.sort = this.sort!;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
