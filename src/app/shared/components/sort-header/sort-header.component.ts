import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort, SortDirection } from '../../interfaces/sort';
import SortHeaderContext from './sort-header-context';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {
  @Input() column?: string;
  @Input() sortField?: string;
  @Input() sortOrder = [SortDirection.DEFAULT, SortDirection.ASC, SortDirection.DESC]
  @Input() context?: SortHeaderContext;
  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter();

  get currentSortOrder(): SortDirection {
    return this.sortOrder[this.context!.get(this.column!)!];
  }

  get sortDirection(): typeof SortDirection {
    return SortDirection;
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  handleClick() {
    this.context!.set(this.column!, this.context!.get(this.column!) + 1);
    const currentIndex = this.context!.get(this.column!);
    if (this.sortOrder[currentIndex] != SortDirection.DEFAULT) {
      this.sortChanged.emit({ field: this.sortField ?? this.column!, direction: this.sortOrder[currentIndex] });
    }
    if (currentIndex == this.sortOrder.length) {
      this.context!.set(this.column!, 0);
    }    
  }

}
