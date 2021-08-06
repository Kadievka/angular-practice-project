import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
  mainUrl = environment.MAIN_API_ENDPOINT;

  prefixUrl = '/users';

  getRandomUsers(): Observable<User[]> {
    console.log(`main api url: ${this.mainUrl}`)
    return this.http.get<User[]>(`${this.mainUrl}${this.prefixUrl}/get-random-users`).pipe(
      catchError(this.handleError<User[]>('getRandomUsers', []))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.mainUrl}${this.prefixUrl}/manage-get-users`).pipe(
      catchError(this.handleError<User[]>('getRandomUsers', []))
    );
  }
}
