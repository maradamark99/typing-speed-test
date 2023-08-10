import { Component, Input, OnInit } from '@angular/core';
import { TableDetails } from '../../types/table-details';
import SortHeaderContext from '../sort-header/sort-header-context';
import { PageOptions } from '../../interfaces/page-options';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SortHeaderContext]
})
  
export class TableComponent<T extends { [key: string]: number | string | boolean }> implements OnInit {
  @Input() tableDetails?: TableDetails;
  @Input() columns?: string[];
  @Input() rows?: T[];

  constructor(public readonly sortHeaderContext: SortHeaderContext) { }

  ngOnInit(): void {
  }

  updatePageOptions(updates: Partial<PageOptions>) {
    //this.pageOptions = { ...this.pageOptions, ...updates };
    //this.getResults();
  }

  handleSortChange(sortBy: Sort) {
    //this.sortColumns.set(sortBy.field, sortBy);
    //this.updatePageOptions({ sort: [...this.sortColumns.values()] });
  }

}
