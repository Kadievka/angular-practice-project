import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../app.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(profile => {
      this.user = profile;
      this.profileForm = new FormGroup({
        nickname: new FormControl(profile.nickname),
        lastName: new FormControl(profile.lastName),
        firstName: new FormControl(profile.firstName),
        cellphone: new FormControl(profile.cellphone),
        address: new FormControl(profile.address),
      });
    });
  }

  exampleEmail = 'example@mail.com';

  user: User = {
    id: '1',
    _id: '1',
    email: this.authService.getEmail() || this.exampleEmail,
  };

  userProfileImage = "https://i.imgur.com/b6a2Zpk.png";

  profileForm = new FormGroup({
    nickname: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    cellphone: new FormControl(''),
    address: new FormControl(''),
  });

  error = {
    show: false,
    message: '',
  }

  updateProfile(): void {
    const user = { ...this.profileForm.value };
    this.userService.updateProfile(user).subscribe(u => {
      if(u.error && u.status === 400){
        this.error.show = true;
        this.error.message = u.error.message;
      }else{
        this.error.show = false;
        this.user = {...u, email: this.authService.getEmail() || this.exampleEmail};
      }
    });
  }

}
