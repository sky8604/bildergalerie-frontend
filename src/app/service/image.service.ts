import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ImageModel} from "../model/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly baseURL = 'http://localhost:8080/bbc-jsf-skeleton-1.0.0/image'

  public uploadImageData(email: any, title: string, description: string, image: File): Observable<ImageModel> {
    return this.httpClient.post<ImageModel>(this.baseURL + '/upload', {
      email,
      title,
      description,
      image
    });
  }

  public uploadImage(image: File): Observable<File> {
    return this.httpClient.post<File>(this.baseURL + '/uploadImage', image);
  }

  public downloadImage(id: number): Observable<File> {
    return this.httpClient.get<File>(this.baseURL + '/downloadImageById?id=' + id);
  }
  }
