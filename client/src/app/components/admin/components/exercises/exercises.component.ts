import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseInfo } from 'src/app/interfaces/ExerciseInfo';
import { ExercisesService } from 'src/app/services/exercises.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesComponent implements OnInit {

  exercises$!: Observable<ExerciseInfo[]>

  constructor(
    private exercisesService: ExercisesService
  ) { }

  ngOnInit(): void {
    this.exercises$ = this.exercisesService.getAll()
  }

}
