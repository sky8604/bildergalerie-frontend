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
        this.alertService.success('You have successfully been registered!', {
          autoClose: true,
          keepAfterRouteChange: true
        });
        this.router.navigate(['/home']);
      }, error => {
          if (error.status == 400) {
            this.alertService.error('There probably is already an account registered with this email.')
          } else {
            this.alertService.error('Unfortunately something went wrong while signing up. Please try again. Error: ' + error.status);
          }
      });
    } else {
      this.alertService.error('Registration Failed. You haven\'t filled out the form correctly.', {
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
