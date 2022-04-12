import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Training } from "../interfaces/Training";

@Injectable({
  providedIn: 'root'
})
export class TrainingService{

  constructor(private http: HttpClient){}

  listTrainings(): Observable<Training[]>{
    return this.http.get<Training[]>('api/traning/')
  }

  trainingsUser(userId: string): Observable<Training[]>{
    return this.http.get<Training[]>('api/training/user/' + userId)
  }
}
