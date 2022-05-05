import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert";

@Component({
  selector: 'app-change-description',
  templateUrl: './change-description.component.html',
  styleUrls: ['./change-description.component.css']
})
export class ChangeDescriptionComponent implements OnInit {

  changeForm = this.formBuilder.group({
    description: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private imageService: ImageService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.changeForm.valid) {
      this.imageService.updateDescription(this.changeForm.controls['description'].value, localStorage.getItem('imageId'), localStorage.getItem('email')).subscribe(value => {
          this.router.navigate(['/image']);
          this.alertService.success('Die Beschreibung wurde aktualisiert.', {
            autoClose: true,
            keepAfterRouteChange: true
          });
        },
        error => {
          this.alertService.error('Ups, da ist was schief gelaufen :(. Fehler: ' + error.status);
          console.log(error);
        }
      )
    } else {
      this.alertService.error('Du hast das Formular falsch ausgefüllt.')
    }
  }

}
