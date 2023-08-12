import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDetails } from '../../types/table-details';
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
  private sortColumns: Map<string, Sort> = new Map();
  private pageOptions: Partial<PageOptions> = {}

  constructor(public readonly sortHeaderContext: SortHeaderContext) {
  }

  ngOnInit(): void {
    if (this.tableDetails!.isSortable) {
      this.columns?.forEach((c) => this.sortHeaderContext.set(c.value ?? c.header, 0));
    }
  }

  handleSortChange(sort: Sort) {
    this.sortColumns.set(sort.field, sort);
    this.updatePageOptions({ sort: [...this.sortColumns.values()] });
  }

  updatePageOptions(changes: Partial<PageOptions>) {
    this.pageOptions = { ...this.pageOptions, ...changes };
    this.pageOptionsChange.emit(this.pageOptions);
  }

}