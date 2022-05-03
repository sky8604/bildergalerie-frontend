import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]+)(?=.*[0-9]+).{8,}')]],
    confirmPassword: ['', [Validators.required]],
    userName: ['', [Validators.required, Validators.minLength(2)]]
  }, {validator: this.matchPassword});

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.userService.signUp(this.signUpForm.controls['email'].value,
        this.signUpForm.controls['userName'].value, this.signUpForm.controls['password'].value).subscribe( value => {
        this.alertService.success('Du hast dich erfolgreich registriert!', {
          autoClose: true,
          keepAfterRouteChange: true
        });
        this.router.navigate(['/home']);
      }, error => {
          if (error.status == 400) {
            this.alertService.error('Wahrscheinlich gibt es bereits ein Konto mit dieser Email.')
          } else {
            this.alertService.error('Leider ist etwas schief gelaufen :( versuche es in einigen Minuten erneut. Fehler: ' + error.status);
          }
      });
    } else {
      this.alertService.error('Registration fehlgeschlagen. Du hast das Formular nicht korrekt ausgefüllt.', {
        autoClose: false,
        keepAfterRouteChange: false
      })
    }
  }


  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      return {'noMatch': true}
    }

    return null;
  }

}
