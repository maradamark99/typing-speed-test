import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  styles:
    [`
      .header{
        background-color: lightblue;
      }

    `]
})
export class LeaderboardComponent implements OnInit {
  // testdata
  data = [{name: "John", wpm: 100, accuracy: "75%", date: "2022-06-02"},
    {name: "Jane", wpm: 56, accuracy: "98%", date: "2034-12-11"},
    {name: "Joe", wpm: 68, accuracy: "92%", date: "2011-03-25"}];

  constructor() { }

  ngOnInit(): void {
  }

}
