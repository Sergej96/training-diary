import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Exercise } from 'src/app/interfaces/Exercise';


@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListComponent {

  @Input()
  exercisesList: Exercise[] = [];

  @Input()
  trainingIndex: number = 0;

  trackExercise(index: number) {
    return index
  }
}
