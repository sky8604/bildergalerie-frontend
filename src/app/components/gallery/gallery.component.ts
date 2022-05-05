import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../service/image.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {Base64Model} from "../../model/base64.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public base64Models: Base64Model[];

  constructor(private imageService: ImageService, private router: Router) {
    this.base64Models = []
  }

  ngOnInit(): void {
    this.imageService.downloadBase64().subscribe( value => this.base64Models = value);
  }

  myClick(id: number): void {
    localStorage.setItem('imageId', String(id));
    this.router.navigate(['/image']);
  }

}
