import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated: boolean = this.verifyTokenExists();

  verifyTokenExists(): boolean {
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  authenticate(jwt: string): void {
    this.isAuthenticated = true;
    localStorage.setItem('token', jwt);
  }

  unauthenticate(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }
}
