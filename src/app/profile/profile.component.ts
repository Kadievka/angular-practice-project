import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(profile => {
      this.user = profile;
    });
  }

  user: User = {
    id: '1',
    _id: '1',
    email: 'email@example.com'
  };

}
