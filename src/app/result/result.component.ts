import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResultService } from '../services/result.service';
import { ResultResponse } from '../interfaces/result-response';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationInfo } from '../interfaces/pagination-info';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public readonly displayedColumns = ['username', 'wpm', 'accuracy', 'timestamp'];
  public readonly pageSizeOptions = [5, 10, 25, 50];
  public dataSource?: MatTableDataSource<ResultResponse>;
  public paginationInfo?: PaginationInfo;
  public selectedPageSize = this.pageSizeOptions[0];


  constructor(public readonly resultService: ResultService) { }

  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit(): void {
    this.fetchResults();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
  fetchResults(page?: number) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.resultService.getAll(!page ? 0 : page, this.selectedPageSize).subscribe({
      error: (e) => console.log(e),
      next: (res) => {
        const {
          content,
          totalPages,
          pageSize,
          currentPage,
          isLastPage,
          isFirstPage,
        } = res;

        this.paginationInfo = {
          totalPages,
          pageSize,
          currentPage,
          isLastPage,
          isFirstPage,
        };
        this.dataSource = new MatTableDataSource(content)
        this.dataSource!.sort = this.sort!;
      }
    });
  }

}
