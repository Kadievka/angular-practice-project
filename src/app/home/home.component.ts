import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCoffee, faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getRandomUsersFromApi();
  }

  faCoffee = faCoffee;
  faEye = faEye;

  passwordType: string = 'password';

  showPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  sortUsersDown(): void {
    this.users.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }

  sortUsersUp(): void {
    this.users.sort((a, b) => parseInt(b.id) - parseInt(a.id));
  }

  newUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
  });

  generateId(userId: string | any): string {
    const foundUser = this.users.find((user) => user.id === userId);
    if (foundUser) {
      userId = this.generateId(`${parseInt(userId) + 1}`);
    }
    return userId;
  }

  addUser(): void {
    console.log(this.newUserForm)
    const user = { ...this.newUserForm.value };
    user.id = this.generateId(`1`);
    this.users.unshift(user);
  }

  deleteUser(user: User): void {
    this.users = this.users.filter((u) => user.id !== u.id);
  }

  users: User[] = [];

  getRandomUsersFromApi(): void {
    this.userService
      .getRandomUsers()
      .subscribe((users) => (this.users = users));
  }
}
