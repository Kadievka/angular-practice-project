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
  faPlusSquare,
  faBan,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated && this.authService.isAdmin()){
      this.getActualUsers();
    }else{
      this.getRandomUsersFromApi();
    }
  }

  faPlusSquare = faPlusSquare;
  faBan = faBan;
  faTimes = faTimes;

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
    this.users.sort((a, b) => {
      return (a.email > b.email) ? 1 : -1;
    });
  }

  sortUsersUp(): void {
    this.users.sort((a, b) => {
      return (b.email > a.email) ? 1 : -1;
    });
  }

  newUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.uniqueValidator(),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
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
    const emailFound = this.users.filter((user) => user.email === email)[0];
    return (emailFound || (this.authService.getEmail() === email));
  }

  canConsumeAdminServices: boolean = (this.authService.isAuthenticated && this.authService.isAdmin());

  addUser(): void {
    const user = { ...this.newUserForm.value };
    if (!this.emailExists(user.email)) {
      this.showErrorEmailExists = false;
      if(this.canConsumeAdminServices){
        this.userService.addOneUser(user).subscribe();
      }
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

  isAdmin(user: User): boolean {
    return user.isAdmin ? true : false;
  }

  alert = {
    show: false,
    message: '',
  }

  closeAlert(): void {
    this.alert = {
      show: false,
      message: '',
    }
  }

  showAlert(message: string): void {
    this.alert.show = true;
    this.alert.message = message;
  }

  deleteUser(user: User): void {
    if(this.isAdmin(user)){
      this.showAlert('Admin users can\'t be deleted.');
      return;
    }
    if(this.canConsumeAdminServices){
      this.userService.deleteOneUser(user).subscribe();
    }
    this.users = this.users.filter((u) => user.email !== u.email);
  }

  isBanned(user: User): boolean {
    return user.isBanned ? true : false;
  }

  banUser(user: User): void {
    if(this.isAdmin(user)){
      this.showAlert('Admin users can\'t be banned.');
      return;
    }
    if(this.isBanned(user)){
      this.showAlert('This user is already banned.');
      return;
    }
    if(this.canConsumeAdminServices){
      this.userService.banOneUser(user).subscribe();
    }
    user.isBanned = true;
  }

  users: User[] = [];

  getRandomUsersFromApi(): void {
    this.userService
      .getRandomUsers()
      .subscribe((users) => (this.users = users));
  }

  getActualUsers(): void {
    this.userService
      .getActualUsers()
      .subscribe((users) => (this.users = users));
  }
}
