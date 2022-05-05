import {ImageService} from "../../service/image.service";
import { Component, OnInit } from '@angular/core';

import {FormBuilder, Validators} from "@angular/forms";
import {AlertService} from "../alert";
import * as ExifReader from 'exifreader';
import {HttpClient, HttpHandler} from "@angular/common/http";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private imageService: ImageService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  async myChange(event: any) {

    const file: File = event.target.files[0];
    if (this.uploadForm.valid){

      if(file) {
        this.imageService.uploadImage(file).subscribe(value => localStorage.setItem('savedImageId', String(value.id)), error => console.log(error));
      }
    }
  }

  getImage() {
    this.imageService.downloadImage(2).subscribe(value => console.log(value), error => console.log(error));
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      this.imageService.uploadImageData(localStorage.getItem('email'), this.uploadForm.controls['title'].value, this.uploadForm.controls['description'].value, localStorage.getItem('savedImageId')).subscribe( value => {
        this.alertService.success('Das Bild wurde hochgeladen.', {
          autoClose: true,
          keepAfterRouteChange: true
        });
      }, error => {
        this.alertService.error('Ups, da ist was schief gelaufen :(. Versuche es nochmals. Fehler: ' + error.status);
      })
    } else {
      this.alertService.error('Du hast das Formular falsch ausgefüllt.')
    }
  }
}
