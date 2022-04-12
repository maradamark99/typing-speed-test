import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {IResult} from "../../interfaces/IResult";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  data: IResult[] = []

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLeaderboard().subscribe(data => {
      this.data = data;
    });
  }
}
