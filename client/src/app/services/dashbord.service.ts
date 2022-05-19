import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, reduce } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private http: HttpClient) { }

  getCountUser(): Observable<number> {
    return this.http.get<number>('api/user/count')
  }

  getCountExercise(): Observable<number> {
    return this.http.get<number>('api/exercise/count')
  }
}
