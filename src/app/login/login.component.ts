import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  faEye = faEye
  faEyeSlash = faEyeSlash

  passwordType: string = 'password';
  showPasswordIcon = faEye;

  showPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showPasswordIcon = this.faEyeSlash;
    } else {
      this.passwordType = 'password';
      this.showPasswordIcon = this.faEye;
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  invalidPassword: boolean = false;

  login(): void {
    const body = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };
    this.userService
      .loginService(body)
      .subscribe((loginData) => {
        if (loginData.error) {
          localStorage.removeItem('token');
          this.invalidPassword = true;
        } else {
          localStorage.setItem('token', loginData.jwt);
          this.invalidPassword = false;
          //TODO redirect to home and block login route
        }
      });
  }

}
