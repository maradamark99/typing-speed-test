import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, TableDetails } from '../../types/table-details';
import SortHeaderContext from '../sort-header/sort-header-context';
import { Sort } from '../../interfaces/sort';
import { PageOptions } from '../../interfaces/page-options';
import { Column } from '../../types/column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SortHeaderContext]
})
  
export class TableComponent<T extends { [key: string]: any }> implements OnInit {
  @Input() tableDetails?: TableDetails;
  @Input() columns?: Column[];
  @Input() rows?: T[];
  @Output() pageOptionsChange: EventEmitter<Partial<PageOptions>> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<T> = new EventEmitter();  
  private sortColumns: Map<string, Sort> = new Map();
  private pageOptions: Partial<PageOptions> = {}

  constructor(public readonly sortHeaderContext: SortHeaderContext) {
    
  }

  get rowAction(): typeof Action {
    return Action;
  }

  ngOnInit(): void {
    if (this.tableDetails!.isSortable) {
      this.columns?.forEach((c) => this.sortHeaderContext.set(c.value ?? c.header, 0));
    }
  }

  handleSortChange(sort: Sort) {
    this.sortColumns.set(sort.field, sort);
    this.handlePageOptionsUpdate({ sort: [...this.sortColumns.values()] });
  }

  handlePageOptionsUpdate(changes: Partial<PageOptions>) {
    this.pageOptions = { ...this.pageOptions, ...changes };
    this.pageOptionsChange.emit(this.pageOptions);
  }

  handleDeleteClick(row: T) {
    this.onDeleteClick.emit(row);
  }

}