import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { RowAction, TableDetails } from '../../types/table-details';
import SortHeaderContext from '../sort-header/sort-header-context';
import { PageOptions } from '../../interfaces/page-options';
import { ResultResponse } from '../../types/result-response';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [SortHeaderContext]
})
export class TableComponent<T extends { [key: string]: (string | number | boolean) }> implements OnInit {
  @ContentChild('rowTemplate') rowTemplate!: TemplateRef<ResultResponse>;
  @ContentChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  @Input() tableDetails?: TableDetails;
  @Input() data?: T[];
  @Output() onPageOptionsChange: EventEmitter<Partial<PageOptions>> = new EventEmitter();
  @Output() onActionClick: EventEmitter<{ action: RowAction, row: T }> = new EventEmitter();
  private pageOptions: Partial<PageOptions> = {};

  constructor(private readonly sortHeaderContext: SortHeaderContext) {
  }

  get rowAction(): typeof RowAction {
    return RowAction;
  }

  ngOnInit(): void {
  }

  handleSortChange() {
    this.handlePageOptionsUpdate({ sort: this.sortHeaderContext.sortValues() });
  }

  handlePageOptionsUpdate(changes: Partial<PageOptions>) {
    this.pageOptions = { ...this.pageOptions, ...changes };
    this.onPageOptionsChange.emit(this.pageOptions);
  }

  handleDeleteClick(row: T) {
    this.onActionClick.emit({action: RowAction.DELETE, row})
  }
  
}