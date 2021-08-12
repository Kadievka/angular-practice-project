import { Component, OnInit } from '@angular/core';
import { faCoffee, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.canLogin = false;
    }else{
      this.canLogin = true;
    }
  }

  faCoffee = faCoffee;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  canLogin: boolean = true;

  logout(): void {
    localStorage.removeItem('token');
  }

}
