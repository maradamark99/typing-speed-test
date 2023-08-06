import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../shared/services/result.service';
import { ResultResponse } from '../shared/interfaces/result-response';
import { Subscription } from 'rxjs';
import { PaginationInfo } from '../shared/interfaces/pagination-info';
import { Sort } from '../shared/interfaces/sort';
import SortHeaderContext from '../shared/components/sort-header/sort-header-context';
import { PageOptions } from '../shared/interfaces/page-options';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public readonly columnsToDisplay = ["user", "wpm", "accuracy", "difficulty", "date"];
  public readonly pageSizeOptions = [5, 10, 15, 20, 30];
  public sortColumns: Map<string, Sort> = new Map();
  public results: ResultResponse[] = [];
  public paginationInfo?: PaginationInfo;
  public readonly sortHeaderContext: SortHeaderContext;
  private pageOptions: Partial<PageOptions> = {};

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
    this.updatePageOptions({ ...this.pageOptions, sort: [...this.sortColumns.values()] });
  }

  handlePageSizeChange(size: number) {
    this.updatePageOptions({ size });
  }
  handlePageChange(page: number) {
    this.updatePageOptions({ page });
  }

  private updatePageOptions(updates: Partial<PageOptions>) {
    this.pageOptions = { ...this.pageOptions, ...updates };
    this.getResults();
  }
  
  getResults() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.resultService.getAll({
      page: this.pageOptions.page,
      size: this.pageOptions.size ?? this.pageSizeOptions[0],
      sort: this.pageOptions.sort
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