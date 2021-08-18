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

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

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

  profileForm = new FormGroup({
    nickname: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    cellphone: new FormControl(''),
    address: new FormControl(''),
  });

  nickNameError = {
    show: false,
    message: '',
  }

  updateProfile(): void {
    const user = { ...this.profileForm.value };
    this.userService.updateProfile(user).subscribe(u => {
      if(u.error && u.status === 400){
        this.nickNameError.show = true;
        this.nickNameError.message = u.error.message;
      }else{
        this.nickNameError.show = false;
        this.user = {...u, email: this.authService.getEmail() || this.exampleEmail};
      }
    });
  }

  isAdmin: boolean = this.authService.isAdmin();

  userProfileImage = "https://i.imgur.com/b6a2Zpk.png";

  processFile(imageInput: any, preview: any): void {
    const file: File = imageInput.files[0];
    this.validateProfileImageExists(file);
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }

  profileImageError = {
    show: false,
    message: '',
  }

  validateProfileImageExists(file: File): void {
    if(!file){
      this.profileImageError.show = true;
      this.profileImageError.message = 'You must to upload an image';
      return;
    }
    this.profileImageError.show = false;
  }

  saveFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    this.validateProfileImageExists(file);
    this.userService.updateProfilePhoto(file).subscribe(response => {
      if(response.error){
        this.profileImageError.show = true;
        this.profileImageError.message = response.error.message;
      }
    });
  }

}
