import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import User from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userService : UserService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUserInfo();
  }

}
