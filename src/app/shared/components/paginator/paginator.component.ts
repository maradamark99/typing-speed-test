import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInfo } from '../../interfaces/pagination-info';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() paginationInfo?: PaginationInfo;
  @Input() pageSizeOptions?: number[];
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();
  selectedPageSize?: number;

  constructor() {}

  ngOnInit(): void {
    this.selectedPageSize = this.pageSizeOptions![0];
  }

  handlePageChange(page: number) {
    this.pageChange.emit(page);
  }

  handlePageSizeChange() {
    this.pageSizeChange.emit(this.selectedPageSize);
  }

}
