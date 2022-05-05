import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ImageInfoModel, ImageModel} from "../model/image.model";
import {Base64Model} from "../model/base64.model";
import {SaveImageDTOModel} from "../model/saveImageDTO.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly baseURL = 'http://localhost:8080/bbc-jsf-skeleton-1.0.0/image'

  public uploadImageData(email: any, title: string, description: string, id: any): Observable<ImageModel> {
    return this.httpClient.post<ImageModel>(this.baseURL + '/uploadImageData', {
      email,
      title,
      description,
      id
    });
  }

  public uploadImage(image: File): Observable<SaveImageDTOModel> {
    return this.httpClient.post<SaveImageDTOModel>(this.baseURL + '/uploadImage', image);
  }

  public downloadImage(id: number): Observable<File> {
    return this.httpClient.get<File>(this.baseURL + '/downloadImageById?id=' + id);
  }

  public downloadBase64(): Observable<Base64Model[]> {
    return this.httpClient.get<Base64Model[]>(this.baseURL + '/downloadBase64');
  }

  public downloadBase64Id(id: any): Observable<Base64Model> {
    return this.httpClient.get<Base64Model>(this.baseURL + '/downloadBase64Id?id=' + id);
  }

  public deleteImage(id: any): Observable<ImageInfoModel> {
    return this.httpClient.delete<ImageInfoModel>(this.baseURL + '/delete?id=' + id);
  }

  public updateDescription(description: string, id: any, email: any): Observable<ImageInfoModel> {
    return this.httpClient.patch<ImageInfoModel>(this.baseURL + '/updateDescription', {
      description,
      id,
      email
    });
  }

  public getImageData(id: any, email: any): Observable<ImageInfoModel> {
    return this.httpClient.get<ImageInfoModel>(this.baseURL + '/imageData?id=' + id + '&email=' + email);
  }
}
