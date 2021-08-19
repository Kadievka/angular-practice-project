import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  mainUrl = environment.MAIN_API_ENDPOINT + '/images';

  updateProfilePhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    console.log(formData.get('photo'));
    return this.http
      .put<any>(`${this.mainUrl}/profile-photo`, formData, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }
}
