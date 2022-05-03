import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public localStorage: Storage;

  constructor() {
    this.localStorage = localStorage;
  }

  public signOut(): void {
    console.log(localStorage)
    console.log(localStorage.getItem('userName'))
    localStorage.setItem('token', '');
    localStorage.setItem('userName', '');
    console.log(localStorage)
    console.log(localStorage.getItem('userName'))
    // window.location.reload();
  }

  ngOnInit(): void {
  }

}
