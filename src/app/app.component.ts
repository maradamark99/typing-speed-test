import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'typing-speed-test';

  constructor(private readonly primengConfig: PrimeNGConfig, private readonly router: Router) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

