import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from "../app/models/user";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
  mainUrl = environment.MAIN_API_ENDPOINT + '/users';

  getRandomUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}/get-random-users`, this.httpOptions).pipe(
      catchError(this.handleError<User[]>('getRandomUsers', [])),
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}/manage-get-users`, this.httpOptions).pipe(
      catchError(this.handleError<User[]>('getRandomUsers', []))
    );
  }

  loginService(body: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/login`, body).pipe(
      catchError( (error) => {
        return of(error);
      })
    );
  }
}
