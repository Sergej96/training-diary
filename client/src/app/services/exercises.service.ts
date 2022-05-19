import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { ExerciseInfo } from "../interfaces/ExerciseInfo";
import { Message } from "../interfaces/Message";
import { Muscle } from "../interfaces/Muscle";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  private musclesData: Muscle[] = [
    { id: 0, name: 'Трапеция' },
    { id: 1, name: 'Плечи' },
    { id: 2, name: 'Бицепс' },
    { id: 3, name: 'Трицепс' },
    { id: 4, name: 'Предплечье' },
    { id: 5, name: 'Грудь' },
    { id: 6, name: 'Спина' },
    { id: 7, name: 'Пресс' },
    { id: 8, name: 'Ягодицы' },
    { id: 9, name: 'Бедра квадрицепса' },
    { id: 10, name: 'Бедра бицепс' },
    { id: 11, name: 'Голень' },
    { id: 12, name: 'Шея' }]

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExerciseInfo[]> {
    return this.http.get<ExerciseInfo[]>(`api/exercise`)
  }

  getById(id: string): Observable<ExerciseInfo> {

    return this.http.get<ExerciseInfo>(`api/exercise/${id}`).pipe(
      map((item: ExerciseInfo) => {

        return {
          ...item,
          muscles: this.convertIdMusclesInName(item.muscles)

        }
      })
    )
  }

  convertIdMusclesInName(item: any) {
    return item.map((item: number) => { return this.getBiIdMuscle(item) })
  }

  getExercisesByMuscle(muscleId: number): Observable<ExerciseInfo[]> {
    return this.http.get<ExerciseInfo[]>(`api/exercise/muscle/${muscleId}`)
  }

  getBiIdMuscle(id: number): Muscle | undefined {
    return this.musclesData.find((value, index) => index == id)
  }

  search(search: string): Observable<ExerciseInfo[]> {
    return this.http.get<ExerciseInfo[]>(`api/exercise/search/${search}`)
  }

  create(exercise: ExerciseInfo): Observable<ExerciseInfo> {
    return this.http.post<ExerciseInfo>(`/api/exercise`, exercise)
  }

  update(id: string, exercise: ExerciseInfo): Observable<ExerciseInfo> {
    return this.http.patch<ExerciseInfo>(`/api/exercise/${id}`, exercise)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/exercise/${id}`)
  }

  get muscles() {
    return this.musclesData
  }

}
