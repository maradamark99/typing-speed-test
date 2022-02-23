import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent{
    public isClicked = false;
    public onToggle(){
        this.isClicked = !this.isClicked;
    }
}
