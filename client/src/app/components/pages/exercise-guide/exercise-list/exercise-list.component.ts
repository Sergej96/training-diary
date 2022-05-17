import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ExerciseInfo } from "src/app/interfaces/ExerciseInfo";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls:['./exercise-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseListComponent {

  @Input()
  edit: boolean = false

  @Input()
  exercises?: ExerciseInfo[] | null

  @Output()
  delete = new EventEmitter<ExerciseInfo>();

  onDelete(exercise: ExerciseInfo){
    this.delete.emit(exercise);
  }

  trackExercise(index:number,item:ExerciseInfo){
    return item._id
  }

}
