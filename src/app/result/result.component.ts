import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../shared/services/result.service';
import { Subscription } from 'rxjs';
import { PaginationInfo } from '../shared/interfaces/pagination-info';
import { PageOptions } from '../shared/interfaces/page-options';
import { ResultResponse } from '../shared/types/result-response';
import { RowAction } from '../shared/enums/row-action';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public results: ResultResponse[] = [];
  public paginationInfo?: PaginationInfo;
  public readonly rowActions = new Set([RowAction.DELETE, RowAction.UPDATE]);
  public readonly columns = ['user', 'wpm', 'accuracy', 'difficulty', 'date'];

  constructor(public readonly resultService: ResultService) {
  }

  ngOnInit(): void {
    this.getResults({});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

  deleteResultById(result: ResultResponse): void {
    this.resultService.deleteById(result.id).subscribe({
      error: (e) => console.log(e),
      next: () => this.getResults({})
    });
  }

}