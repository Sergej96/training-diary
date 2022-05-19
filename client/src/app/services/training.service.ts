import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Training } from "../interfaces/Training";

@Injectable({
  providedIn: 'root'
})
export class TrainingService{

  constructor(private http: HttpClient){}

  getByIdUser(userId: string): Observable<Training[]>{
    return this.http.get<Training[]>(`api/training/user/${userId}`)
  }

  getUser(): Observable<Training[]>{
    return this.http.get<Training[]>(`api/training/user/`)
  }

  save(data:any): Observable<any>{
    return this.http.post<any>(`api/training`,data)
  }
}
