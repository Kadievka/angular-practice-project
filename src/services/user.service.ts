import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../app/models/user';
import { environment } from '../environments/environment';
import { Login } from '../app/models/login';
import { Register } from '../app/models/register';
import { Profile } from '../app/models/profile';
import { ProfilePhoto } from 'src/app/models/profilePhoto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
  mainUrl = environment.MAIN_API_ENDPOINT + '/users';

  getRandomUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.mainUrl}/get-random-users`, this.httpOptions)
      .pipe(catchError(this.handleError<User[]>('getRandomUsers', [])));
  }

  loginService(body: Login): Observable<any> {
    return this.http
    .post<any>(`${this.mainUrl}/login`, body)
    .pipe(catchError((error) => of(error)));
  }

  getActualUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.mainUrl}/manage-get-all`,
      this.httpOptions
    );
  }

  addOneUser(user: Register): Observable<User> {
    return this.http
      .post<User>(`${this.mainUrl}`, user, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }

  deleteOneUser(user: User): Observable<User> {
    return this.http
      .delete<User>(`${this.mainUrl}/manage-delete/${user.email}`, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }

  banOneUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.mainUrl}/manage-ban/${user.email}`, null, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }

  removeBanUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.mainUrl}/manage-remove-ban/${user.email}`, null, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/profile`, this.httpOptions);
  }

  updateProfile(user: Profile): Observable<User> {
    return this.http
      .put<User>(`${this.mainUrl}/profile`, user, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }

  updateProfilePhoto(body: ProfilePhoto): Observable<any> {
    return this.http
      .post<any>(`${this.mainUrl}/profile-photo`, body, this.httpOptions)
      .pipe(catchError((error) => of(error)));
  }
}
