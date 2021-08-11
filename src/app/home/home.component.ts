import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import {
  faEye,
  faEyeSlash,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
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

  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;

  passwordType: string = 'password';
  showPasswordIcon = faEye;

  showPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showPasswordIcon = faEyeSlash;
    } else {
      this.passwordType = 'password';
      this.showPasswordIcon = faEye;
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
      Validators.email,
      this.uniqueValidator(),
    ]),
    password: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
  });

  uniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailExists;
      if (this.users) {
        this.emailExists(control.value);
      }
      return emailExists ? { emailExists: { value: control.value } } : null;
    };
  }

  emailExists(email: string): User {
    return this.users.filter((user) => user.email === email)[0];
  }

  generateId(userId: string | any): string {
    const foundUser = this.users.find((user) => user.id === userId);
    if (foundUser) {
      userId = this.generateId(`${parseInt(userId) + 1}`);
    }
    return userId;
  }

  addUser(): void {
    const user = { ...this.newUserForm.value };
    user.id = this.generateId(`1`);
    if (!this.emailExists(user.email)) {
      this.showErrorEmailExists = false;
      this.users.unshift(user);
    } else {
      this.showErrorEmailExists = true;
    }
  }

  verifyEmailExists(): void {
    if (this.emailExists(this.newUserForm.controls.email.value)) {
      this.showErrorEmailExists = true;
    } else {
      this.showErrorEmailExists = false;
    }
  }

  showErrorEmailExists: boolean = false;

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
