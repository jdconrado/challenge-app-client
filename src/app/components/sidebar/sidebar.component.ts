import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService }  from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() clicked = new EventEmitter<boolean>();
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.clicked.emit(true);
  }

  async logOut(){
    await this.auth.logOut();
    this.clicked.emit(true);
    this.router.navigate(["/"]);
  }

}
