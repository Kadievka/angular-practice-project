import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getRandomUsersFromApi();
  }

  sortUsersDown(): void {
    this.users.sort((a, b) => (parseInt(a.id) - parseInt(b.id)));
  }

  sortUsersUp(): void {
    this.users.sort((a, b) => (parseInt(b.id) - parseInt(a.id)));
  }

  newUserForm = new FormGroup({
    email: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    password: new FormControl(''),
  });

  generateId(userId: string | any ): string {
    const foundUser = this.users.find(user => user.id === userId);
    if (foundUser) {
      userId = this.generateId(`${parseInt(userId) + 1}`);
    }
    return userId;
  }

  addUser(): void {
    const user = {...this.newUserForm.value};
    user.id = this.generateId(`1`);
    this.users.unshift(user);
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => user.id !== u.id);
  }

  users: User[] = [];

  getRandomUsersFromApi(): void {
    this.userService.getRandomUsers().subscribe(users => this.users = users);
  }

}
