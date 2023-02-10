import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public readonly words?: Array<String> 

	constructor() { 
		// for testing purposes
    this.words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur",]
	}

  ngOnInit(): void {
  }

}
