import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort, SortDirection } from '../../interfaces/sort';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss']
})
export class SortHeaderComponent implements OnInit {
  @Input() column?: string;
  @Input() sortField?: string;
  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter();
  @Input() sortOrder = [SortDirection.DEFAULT, SortDirection.ASC, SortDirection.DESC]
  private index: number = 0;

  constructor() {

  }

  ngOnInit(): void {
  }

  handleClick() {
    if (this.index == this.sortOrder.length - 1) {
      this.index = 0;
    }
    if (this.sortOrder[this.index] != SortDirection.DEFAULT) {
      this.sortChanged.emit({field: this.sortField ?? this.column!, direction: this.sortOrder[this.index]});
    }
    this.index++;
  }

}
