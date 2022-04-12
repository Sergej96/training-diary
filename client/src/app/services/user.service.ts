import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient){}

  allUser(): Observable<User[]>{
    return this.http.get<User[]>('api/user/all')
  }

  userInfo(): Observable<User>{
    return this.http.get<User>(`api/user/info`)
  }
}
