import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Muscle } from 'src/app/interfaces/Muscle';
import { ExercisesService } from 'src/app/services/exercises.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFormComponent implements OnInit, OnDestroy {

  isNew: boolean = true
  form!: FormGroup
  musclesData: Muscle[] = []
  exerciseId!: string
  loading: boolean = false
  destroy$:Subject<unknown> = new Subject()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exercisesService: ExercisesService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      technique: new FormControl(''),
      recomend: new FormControl(''),
      muscles: new FormArray([], this.minSelectedCheckboxes(1))
    })

    this.musclesData = this.exercisesService.muscles
    this.addCheckboxes()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              this.exerciseId = params['id']
              return this.exercisesService.getById(params['id'])
            }
            return of(null)
          }
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(
        exercise => {
          this.loading = false
          if (exercise) {
            exercise.muscles.forEach((m:Muscle) => {
              console.log(m);

              this.musclesFormArray.at(m.id).setValue(true)
            });

            this.form.patchValue({
              name: exercise.name,
              description: exercise.description,
              technique: exercise.technique,
              recomend: exercise.recomend
            })
            this.cdr.markForCheck()

          }
        },
        error => {
          this._snackBar.open(error.error.message, 'Закрыть', {
            verticalPosition: 'top',
            duration: 3000
          })
        }
      )
  }

  minSelectedCheckboxes(min: number): ValidatorFn {
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };

    return validator;
  }

  onSubmit() {
    this.form.disable
    let obs$
    const muscles = this.form.value.muscles
      .map((checked: boolean, i: number) => checked ? i : null)
      .filter((v: any) => v !== null)


    const exercise = {
      name: this.form.value.name,
      description: this.form.value.description,
      technique: this.form.value.technique,
      recomend: this.form.value.recomend,
      muscles: muscles
    }
    console.log(exercise);

    if (this.isNew) {
      obs$ = this.exercisesService.create(exercise)
    }
    else {
      obs$ = this.exercisesService.update(this.exerciseId, exercise)
    }

    obs$.subscribe(
      () => {
        this._snackBar.open(`Упражнение ${this.isNew ? 'создано' : 'изменено'}`, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
        this.router.navigate(['/admin/exercises'])
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      },
      () => {
        this.form.enable
      }
    )

  }

  get musclesFormArray() {
    return this.form.get('muscles') as FormArray
  }

  addCheckboxes() {
    this.musclesData.forEach(
      () => { this.musclesFormArray.push(new FormControl(false)) }
    )
  }

  trackMuscle(index: number){
    return index
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
