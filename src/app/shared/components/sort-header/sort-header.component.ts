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
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter();

  get currentSortOrder(): SortDirection {
    return this.context.sortOrder[this.context!.get(this.column!)!];
  }

  get sortDirection(): typeof SortDirection {
    return SortDirection;
  }

  constructor(private readonly context: SortHeaderContext) {
  }

  ngOnInit(): void {
    const field = this.sortField ?? this.column!
    if (!this.context.has(field)) {
      this.context.set(field, 0);
    }
  }

  handleClick() {
    this.context!.set(this.column!, this.context!.get(this.column!) + 1);
    const currentIndex = this.context!.get(this.column!);
    if (this.context.sortOrder[currentIndex] != SortDirection.DEFAULT) {
      this.sortChange.emit({ field: this.sortField ?? this.column!, direction: this.context.sortOrder[currentIndex] });
    }
    if (currentIndex == this.context.sortOrder.length) {
      this.context!.set(this.column!, 0);
    }    
  }

}
