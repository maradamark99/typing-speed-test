import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {DataService} from "./services/data.service";
import {TokenService} from "./services/token.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'typing-speed-test';
  subscription1?: Subscription;
  subscription2?: Subscription;

  constructor(private readonly primengConfig: PrimeNGConfig,
              public readonly dataService: DataService, public readonly tokenService: TokenService) {
    this.primengConfig.ripple = true;
  }

  ngOnInit() {
    this.primengConfig.ripple = true
  }

  ngOnDestroy(){
    this.subscription1?.unsubscribe()
    this.subscription2?.unsubscribe()
  }

  getAllResults(){
    this.subscription1 = this.dataService.getLeaderboard().subscribe(data => {
      this.dataService.results = data;
    });
  }
  getMyResults(){
    this.subscription2 = this.dataService.getMyLeaderboard().subscribe(data => {
      this.dataService.results = data;
    });
  }

}

