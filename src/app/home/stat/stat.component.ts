import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input() valueToDisplay?: number; 
  @Input() label?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
