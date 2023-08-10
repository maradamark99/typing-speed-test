import { Component, OnInit } from '@angular/core';
import SortHeaderContext from 'src/app/shared/components/sort-header/sort-header-context';
import { PageOptions } from 'src/app/shared/interfaces/page-options';
import { PaginationInfo } from 'src/app/shared/interfaces/pagination-info';
import { Sort } from 'src/app/shared/interfaces/sort';

@Component({
  selector: 'app-manage-words',
  templateUrl: './manage-words.component.html',
  styleUrls: ['./manage-words.component.scss']
})
export class ManageWordsComponent implements OnInit {
  paginationInfo?: PaginationInfo;
  pageSizeOptions?: number[];
  words?: string[];
  columnsToDisplay: any;
  sortHeaderContext: SortHeaderContext|undefined;

  constructor() { }

  ngOnInit(): void {
    
  }

  updatePageOptions(updates: Partial<PageOptions>) {
    throw new Error('Method not implemented.');
  }

  handleSortChange($event: Sort) {
    throw new Error('Method not implemented.');
  }

}
