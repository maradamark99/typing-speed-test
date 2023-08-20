import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../shared/services/result.service';
import { Subscription } from 'rxjs';
import { PaginationInfo } from '../shared/interfaces/pagination-info';
import { PageOptions } from '../shared/interfaces/page-options';
import { Action, TableDetails } from '../shared/types/table-details';
import { ResultResponse } from '../shared/types/result-response';
import { Column } from '../shared/types/column';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public readonly columns: Column[];
  public tableDetails?: TableDetails;
  public results: ResultResponse[] = [];
  public paginationInfo?: PaginationInfo;

  constructor(public readonly resultService: ResultService) {
    this.columns = ["username", "wpm", "accuracy", "difficulty", "date"].map((c) => {
      if (c === "username") {
          return { header: c, value: "user" };
      } else {
          return { header: c, value: c };
      }
    });
    this.tableDetails = {
      isSortable: true,
      noDataMessage: 'No results found.',
      paginationDetails: { paginationInfo: this.paginationInfo! },
      rowActions: new Set([Action.DELETE])
    };
  }

  ngOnInit(): void {
    this.getResults({});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // TODO: change this
  handleRowActionClick(e: { row: ResultResponse; action: Action; }) {
    if (e.action === Action.DELETE) {
      this.deleteResultById(e.row.id);
    }
  }

  getResults(pageOptions: Partial<PageOptions>): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.resultService.getAll({
      page: pageOptions.page,
      size: pageOptions.size,
      sort: pageOptions.sort
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

  deleteResultById(id: number): void {
    this.resultService.deleteById(id).subscribe({
      error: (e) => console.log(e),
      next: () => this.getResults({})
    });
  }

}