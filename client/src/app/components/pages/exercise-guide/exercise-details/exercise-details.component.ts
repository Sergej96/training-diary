import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { ExerciseInfo } from "src/app/interfaces/ExerciseInfo";
import { Muscle } from "src/app/interfaces/Muscle";
import { ExercisesService } from "src/app/services/exercises.service";

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss']
})
export class ExerciseDetailsComponent implements OnInit {

  exerciseInfo$!: Observable<ExerciseInfo | null>

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExercisesService
  ) { }
  ngOnInit(): void {
    this.exerciseInfo$ = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            return this.exerciseService.getById(params['id']);
          }
          return of(null);
        })
      )
  }

  showMuscle(item: Muscle) {
    return " " + item.name;
  }


}
