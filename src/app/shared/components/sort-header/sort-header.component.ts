import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '../../interfaces/sort';
import SortHeaderContext from './sort-header-context';
import { SortDirection } from '../../enums/sort-direction';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {
  @Input() column!: string;
  @Input() sortField?: string;
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter();
  private sortBy?: string;

  get currentSortOrder(): SortDirection {
    return this.context.sortOrder[this.context!.get(this.sortBy!)!];
  }

  get sortDirection(): typeof SortDirection {
    return SortDirection;
  }

  constructor(private readonly context: SortHeaderContext) {
  }

  ngOnInit(): void {
    this.sortBy = this.sortField ?? this.column
    if (!this.context.has(this.sortBy)) {
      this.context.set(this.sortBy, 0);
    }
  }

  handleClick() {
    this.context!.set(this.sortBy!, this.context.get(this.sortBy!) + 1);
    const currentIndex = this.context!.get(this.sortBy!);
    if (this.context.sortOrder[currentIndex] != SortDirection.DEFAULT) {
      this.sortChange.emit({ field: this.sortBy!, direction: this.context.sortOrder[currentIndex] });
    }
    if (currentIndex == this.context.sortOrder.length) {
      this.context!.set(this.sortBy!, 0);
    }    
  }

}
