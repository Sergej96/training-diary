import { ChangeDetectionStrategy, Component, Input, OnChanges, } from "@angular/core";
import { Exercise } from "src/app/interfaces/Exercise";
import { Muscle } from "src/app/interfaces/Muscle";
import { ExercisesService } from "src/app/services/exercises.service";

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExerciseItemComponent implements OnChanges {

  muscles: string[] = []

  @Input()
  index: number = 0;

  @Input()
  item: Exercise = {
    exerciseId: '',
    approaches: []
  }

  constructor(
    private exerciseService: ExercisesService
  ) { }

  ngOnChanges(): void {
    this.muscles = this.exerciseService.convertIdMusclesInName(this.item.info?.muscles!)
  }

  showMuscles(item: Muscle) {
    return " " + item.name
  }

}
