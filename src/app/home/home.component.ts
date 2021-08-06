import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.getUsersFromApi();
  }

  token = localStorage.getItem("token");

  registeredUsers: User[] = [];

  //TODO consume another service to reload every time button add is clicked
  randomUser: User = {
    id: `${Math.floor(Math.random() * 1000000)}`,
    firstName: "Ana",
    lastName: "Gomez",
    email: "random@email.com",
    password: '21R$#ewrBRvbw4',
  }

  getUsersFromApi(): void {
    if( this.token ) {
      this.usersService.getUsers().subscribe(users => this.registeredUsers = users);
    } else {
      this.usersService.getRandomUsers().subscribe(users => this.registeredUsers = users);
    }
  }

}
