import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../service/image.service";
import {Base64Model} from "../../model/base64.model";
import {Router} from "@angular/router";
import {ImageInfoModel} from "../../model/image.model";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  public base64: Base64Model;
  public imageInfo: ImageInfoModel;

  constructor(private imageService: ImageService, private router: Router) {
    this.base64 = {
      base64: '',
      id: 0
    };
    this.imageInfo = {
      description: '',
      title: '',
      userName: '',
      id: 0,
      creationTime: '',
      size: '',
      isDirectory: '',
      isSymbolicLink: '',
      isRegularFile: '',
      lastAccessTime: '',
      fileKey: '',
    }
  }

  ngOnInit(): void {
    this.imageService.downloadBase64Id(localStorage.getItem('imageId')).subscribe( value => this.base64 = value);
    this.imageService.getImageData(localStorage.getItem('imageId'), localStorage.getItem('email')).subscribe(value => this.imageInfo = value);
  }

  myDelete(): void {
    this.imageService.deleteImage(localStorage.getItem('imageId')).subscribe( value => this.router.navigate(['/gallery']))
  }

}
