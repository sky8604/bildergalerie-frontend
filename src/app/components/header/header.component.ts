import {Component, Injectable, OnInit} from '@angular/core';
import {AlertService} from "../alert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit {

  public localStorage: Storage;

  constructor(private alertService: AlertService, private router: Router) {
    this.localStorage = localStorage;
  }

  public signOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('email', '');
    this.alertService.success('Du bist nun ausgeloggt', {
      autoClose: true,
      keepAfterRouteChange: true
    });
    this.router.navigate(['/home'])
  }

  public changeHeaderLogin(storage: Storage): void {
    this.localStorage = storage;
  }

  ngOnInit(): void {
  }

}
