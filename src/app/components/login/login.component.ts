import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]+)(?=.*[0-9]+).{8,}')]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private alertService: AlertService, private header: HeaderComponent) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.userService.signIn(this.signInForm.controls['email'].value, this.signInForm.controls['password'].value).subscribe(value => {
          localStorage.setItem('userName', value.userName);
          localStorage.setItem('token', value.token);
          localStorage.setItem('email', value.email);
          this.header.changeHeaderLogin(localStorage);
          this.alertService.success('Du hast dich erflogreich angemeldet. Hallo, ' + localStorage.getItem('userName') + ' :)', {
            autoClose: true,
            keepAfterRouteChange: true
          });
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status == 401) {
            this.alertService.error('Wir konnten keinen User mit diesen Zugangsdaten finden. Bitte versuche es erneut oder registriere einen neuen Account.');
          } else {
            this.alertService.error('Es ist beim Einloggen etwas schief gelaufen :(. Bitte erneut versuchen. Fehler: ' + error.status);
          }
        })
      return;
    } else {
      this.alertService.error('Das Formular wurde nicht korrekt ausgef??llt.', {
        autoClose: true,
        keepAfterRouteChange: false
      })
      return;
    }

  }
}
