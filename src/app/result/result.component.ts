import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../shared/services/result.service';
import { ResultResponse } from '../shared/interfaces/result-response';
import { Subscription } from 'rxjs';
import { PaginationInfo } from '../shared/interfaces/pagination-info';
import { Sort } from '../shared/interfaces/sort';
import SortHeaderContext from '../shared/components/sort-header/sort-header-context';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public readonly pageSizeOptions = [5, 10, 25, 50];
  public readonly columnsToDisplay = ["user", "wpm", "accuracy", "difficulty", "date"];
  public sortColumns: Map<string, Sort> = new Map();
  public results: ResultResponse[] = [];
  public paginationInfo?: PaginationInfo;
  public selectedPageSize = this.pageSizeOptions[0];
  public readonly sortHeaderContext: SortHeaderContext;

  constructor(public readonly resultService: ResultService) {
    const columnsAndDirections = new Map();
    this.columnsToDisplay.forEach((column) => columnsAndDirections.set(column, 0));
    this.sortHeaderContext = new SortHeaderContext(columnsAndDirections);
  }

  ngOnInit(): void {
    this.getResults();
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleSortChange(sortBy: Sort) {
    this.sortColumns.set(sortBy.field, sortBy);
    this.getResults(this.paginationInfo?.currentPage, [...this.sortColumns.values()]);
  }
  
  getResults(page?: number, sortBy?: Sort[]) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.resultService.getAll({
      page: page ?? 0,
      size: this.selectedPageSize,
      sort: sortBy
    }).subscribe({
      error: (e) => console.log(e),
      next: (res) => {
        const { content, ...pagination } = res
        this.paginationInfo = {
          ...pagination
        };
        this.results = content
      },
    });
  }

}