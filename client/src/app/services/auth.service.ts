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

    constructor(private router: Router, private http: HttpClient) {}

    setToken(token: string){
        localStorage.setItem('token', token);
    }

    getToken(): string{
        const tokenValue = localStorage.getItem('token')
        return tokenValue ? tokenValue : ''
    }

    isLoggedIn(){
        return !!this.getToken();
    }

    register(userInfo: User): Observable<User> {
        return this.http.post<User>('api/auth/register', userInfo)
    }

    login(userInfo: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('api/auth/login', userInfo)
            .pipe(
                tap(
                    ({token}) => {
                        this.setToken(token)
                    }
                )
            )
    }

    logout(){
        if(confirm('Вы уверены что хотите выйти?')){
            localStorage.removeItem('token');
            this.setToken('')
            this.router.navigate(['login']);
        }
    }
}