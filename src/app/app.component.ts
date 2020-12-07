import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeaderAndSideMenu : boolean = true;
  isPhoneScreen: boolean = false;
  constructor (private router: Router, private auth: AuthService) {

    this.isPhoneScreen = window.innerWidth < 450;
    if(["/", "/login", "/sign-up", "/not-found"].includes(this.router.url)){
      this.showHeaderAndSideMenu= false;
    }
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        if(["/", "/login", "/sign-up", "/not-found"].includes(this.router.url)){
          this.showHeaderAndSideMenu= false;
        }else{
          this.showHeaderAndSideMenu = true;
        }
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isPhoneScreen = window.innerWidth < 450;
  }

}
