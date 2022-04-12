import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { User } from "../interfaces/User";
import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  getToken(): string {
    const tokenValue = localStorage.getItem('token')
    return tokenValue ? tokenValue : ''
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getRoleUser(): string {
    const roleUser = localStorage.getItem('roleUser')
    return roleUser ? roleUser : ''
  }

  setRoleUser(role: string){
    localStorage.setItem('roleUser', role)
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  checkAdmin() {
    return this.getRoleUser() == 'ADMIN'
  }

  register(userInfo: User): Observable<User> {
    return this.http.post<User>('api/auth/register', userInfo)
  }

  login(userInfo: User): Observable<{ token: string, role: string }> {
    return this.http.post<{ token: string, role: string }>('api/auth/login', userInfo)
      .pipe(
        tap(
          ({ token, role }) => {
            this.setToken(token)
            this.setRoleUser(role)
          }
        )
      )
  }

  logout() {
    if (confirm('Вы уверены что хотите выйти?')) {
      localStorage.removeItem('token');
      this.setToken('')
      this.router.navigate(['login']);
    }
  }
}
