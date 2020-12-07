import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import User from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login/login.component.scss']
})
export class SignUpComponent implements OnInit {
  loading: boolean = false;
  user: User = new User();
  toogleAlert : {on: boolean, message?: string} = {on: false};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    this.toogleAlert.on= false;
    if(this.validateUserInput()){
      this.loading = true;
      const result = await this.auth.registerUser(this.user);
      if(result.success){
        this.router.navigate(['/dashboard']);
      }else{
        this.toogleAlert = {on: true, message: result.message};
      }
      this.loading = false;
    }
  }

  validateUserInput():boolean{
    
    if(this.user.name === undefined || this.user.name.trim() === ''){
      this.toogleAlert = {on: true, message:'Name is required.'};
      return false;
    }

    if(this.user.lastName === undefined || this.user.lastName.trim() === ''){
      this.toogleAlert = {on: true, message:'Last Name is required.'};
      return false;
    }

    if(this.user.email === undefined || this.user.email.trim()=== ''){
      this.toogleAlert = {on: true, message:'Email cannot be empty.'};
      return false;
    }
    
    if(this.user.password === undefined || this.user.password=== '' || this.user.password.length<7 ){
      this.toogleAlert = {on: true, message:'Password length must be at least 7.'};
      return false;
    }
    return true;
  }

}
