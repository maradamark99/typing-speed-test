import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {IResult} from "../../interfaces/IResult";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(public readonly dataService: DataService) { }

  ngOnInit(): void {
  }
}
