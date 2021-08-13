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

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  verifyTokenExists(): boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  authenticate(data: {email:string, isAdmin: boolean, jwt: string}): void {
    console.log(data)
    const {email, isAdmin, jwt} = {...data}
    this.isAuthenticated = true;
    localStorage.setItem('kgy2ufg1', isAdmin ? 'true' : 'false');
    localStorage.setItem('token', jwt);
    localStorage.setItem('email', email);
  }

  unauthenticate(): void {
    this.isAuthenticated = false;
    localStorage.setItem('kgy2ufg1', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
