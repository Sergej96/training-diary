import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/interfaces/Exercise';
import { ExerciseInfo } from 'src/app/interfaces/ExerciseInfo';
import { Muscle } from 'src/app/interfaces/Muscle';
import { ExercisesService } from 'src/app/services/exercises.service';


@Component({
  selector: 'button-add-exercise-modal.',
  templateUrl: './add-exercise-modal.component.html',
  styleUrls: ['./add-exercise-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExerciseModalComponent implements OnInit {

  @Output() addEvent = new EventEmitter<ExerciseInfo>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  openExercise() {
    const dialogRef = this.dialog.open(ExerciseDialog, { width: '900px', height: '700px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEvent.emit(result)
      }
    })
  }
}

@Component({
  selector: 'exercise-dialog',
  templateUrl: 'exercise-dialog.html',
  styleUrls: ['./add-exercise-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDialog implements OnInit {

  musclesData!: Muscle[]
  exercises$!: Observable<ExerciseInfo[]>
  defaultOption: number = 0

  constructor(
    private exercisesService: ExercisesService,
    private dialogRef: MatDialogRef<ExerciseDialog>,
    @Inject(MAT_DIALOG_DATA) data: Exercise,) { }

  ngOnInit(): void {
    this.musclesData = this.exercisesService.muscles
    this.exercises$ = this.exercisesService.getExercisesByMuscle(0)
  }

  onClose() {
    this.dialogRef.close()
  }

  onMuscleChange(value: number) {
    this.exercises$ = this.exercisesService.getExercisesByMuscle(value)
  }

}
