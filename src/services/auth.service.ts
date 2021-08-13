import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isAuthenticated: boolean = this.verifyTokenExists();

  isAdmin(): boolean {
    if(localStorage.getItem('kgy2ufg1') === 'true') {
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  verifyTokenExists(): boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  authenticate(jwt: string, isAdmin: boolean): void {
    this.isAuthenticated = true;
    localStorage.setItem('kgy2ufg1', 'true');
    localStorage.setItem('token', jwt);
  }

  unauthenticate(): void {
    this.isAuthenticated = false;
    localStorage.setItem('kgy2ufg1', 'false');
    localStorage.removeItem('token');
  }
}
