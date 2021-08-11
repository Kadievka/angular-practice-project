import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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

}
