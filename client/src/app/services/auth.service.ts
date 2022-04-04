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

    private token: string = ''

    setToken(token: string){
        this.token = token;
    }

    getToken(){
        return this.token
    }

    isLoggedIn(){
        return !!this.getToken();
    }

    login(userInfo: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('api/auth/login', userInfo)
            .pipe(
                tap(
                    ({token}) => {
                        localStorage.setItem('token', token);
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