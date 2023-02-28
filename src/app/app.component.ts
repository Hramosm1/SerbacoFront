import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService]
})

export class AppComponent implements OnInit{
  public token = null;

  constructor(private _userService: UserService,private _router: Router){
    this.token = _userService.getToken();
  }


  ngOnInit() {
    this.token = this._userService.getToken();
    console.log(this.token);
    
    // this.getToket()
  }

  getToket(): void{
    this.token = this._userService.getToken();
  }

  title = 'frontendserbaco';
}
