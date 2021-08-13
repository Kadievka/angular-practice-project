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
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) { }

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
          this.authService.unauthenticate();
          console.log(loginData);
          if(loginData.error.statusCode === 403 || loginData.error.statusCode === 400){
            this.invalidPassword = true;
          }
        } else {
          this.authService.authenticate(loginData);
          this.invalidPassword = false;
          this.router.navigate(['/']);
        }
      });
  }

}
