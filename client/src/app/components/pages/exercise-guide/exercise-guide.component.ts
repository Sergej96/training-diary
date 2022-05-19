import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { ExerciseInfo } from 'src/app/interfaces/ExerciseInfo';
import { AuthService } from 'src/app/services/auth.service';
import { ExercisesService } from 'src/app/services/exercises.service';

@Component({
  selector: 'app-exercise-guide',
  templateUrl: './exercise-guide.component.html',
  styleUrls: ['./exercise-guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseGuideComponent implements OnInit, OnDestroy {

  exercises$!: Observable<ExerciseInfo[]>;
  search: FormControl = new FormControl('');
  isAdmin: boolean = false;
  private destroy$ = new Subject();

  constructor(
    private exercisesService: ExercisesService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.exercises$ = this.exercisesService.getAll();
    this.search.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        result => {
          if (result) {
            this.exercises$ = this.exercisesService.search(result)
          }
        }
      );
  }

  onMuscleChange(value: number) {
    this.exercises$ = this.exercisesService.getExercisesByMuscle(value);
  }

  onSubmitSearch() {
    if (this.search.value) {
      this.exercises$ = this.exercisesService.search(this.search.value);
    } else {
      this.exercises$ = this.exercisesService.getAll();
    }
  }

  deleteExercise(exercise: ExerciseInfo) {
    if (confirm('Вы уверены что хотите удалить упражнение?')) {
      this.exercisesService.delete(exercise?._id!)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (res) => {
            this._snackBar.open(res.message, 'Закрыть', {
              verticalPosition: 'top',
              duration: 3000
            })
            this.exercises$ = this.exercisesService.getAll()
            this.cdr.detectChanges()
          },
          (error) => {
            this._snackBar.open(error.error.message, 'Закрыть', {
              verticalPosition: 'top',
              duration: 3000
            })
          }
        )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
