import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isPhoneScreen!: boolean;
  @Output() toogleSidebar = new EventEmitter<boolean>();
  show: boolean = true;
  constructor(){}

  ngOnInit(): void {
  }

  onClickMore(){
    this.toogleSidebar.emit(true);
  }

}
