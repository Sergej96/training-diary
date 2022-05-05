import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/interfaces/Exercise';
import { ExercisesService } from 'src/app/services/exercises.service';


@Component({
  selector: 'app-exercise-modal.',
  templateUrl: './exercise-modal.component.html',
  styleUrls: ['./exercise-modal.component.scss']
})
export class ExerciseModalComponent implements OnInit {

  @Output() removeEvent = new EventEmitter<string>();
  @Output() addEvent = new EventEmitter<Exercise>();
  exercise!: Exercise

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {  }

  openExercise() {
    const dialogRef = this.dialog.open(ExerciseDialog);
    dialogRef.afterClosed().subscribe(result =>{
      console.log(result)
      this.addExercise(result)
      this.exercise = result
    })
  }

  removeExercise() {
    this.removeEvent.next('');
  }

  addExercise(increased:any){
    this.addEvent.emit(increased)
  }
}

@Component({
  selector: 'exercise-dialog',
  templateUrl: 'exercise-dialog.html',
  styleUrls: ['./exercise-modal.component.scss']
})
export class ExerciseDialog implements OnInit{

  musclesData!: string []
  exercises$!: Observable<any>
  defaultOption: number = 0

  constructor(
    private exercisesService: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public data: Exercise,){}

  ngOnInit(): void {
    this.musclesData = this.exercisesService.muscles
    this.exercises$ = this.exercisesService.getExercisesByMuscle(0)
  }

  onMuscleChange(value:number){
    this.exercises$ = this.exercisesService.getExercisesByMuscle(value)
  }

  addExercise(exercise: any){

  }
}
