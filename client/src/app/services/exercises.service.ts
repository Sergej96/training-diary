import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { ExerciseInfo } from "../interfaces/ExerciseInfo";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private musclesData: string[] = ['Трапеция', 'Плечи', 'Бицепс', 'Трицепс', 'Предплечье', 'Грудь', 'Спина', 'Пресс', 'Ягодицы', 'Бедра квадрицепс', 'Бедра бицепс', 'Голень', 'Шея']

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExerciseInfo[]> {
    return this.http.get<ExerciseInfo[]>(`api/exercise`)
  }

  getById(id: string): Observable<ExerciseInfo> {
    return this.http.get<ExerciseInfo>(`api/exercise/${id}`)
  }

  get muscles() {
    return this.musclesData
  }

  getExercisesByMuscle(muscleId: number): Observable<ExerciseInfo[]> {
    return this.http.get<ExerciseInfo[]>(`api/exercise/muscle/${muscleId}`)
  }

  create(exercise: ExerciseInfo): Observable<ExerciseInfo> {
    return this.http.post<ExerciseInfo>(`/api/exercise`, exercise)
  }

  update(id: string, exercise: ExerciseInfo): Observable<ExerciseInfo> {
    return this.http.patch<ExerciseInfo>(`/api/exercise/${id}`, exercise)
  }

}
