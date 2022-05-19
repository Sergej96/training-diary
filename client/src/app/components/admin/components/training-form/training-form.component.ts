import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators'
import { Training } from 'src/app/interfaces/Training';
import { TrainingService } from 'src/app/services/training.service';
import { ApproacheFormControlComponent } from './approaches-form-array/approache-form-control/approache-form-control.component';
import { ExerciseFormControlComponent } from './exercises-form-array/exercise-form-control/exercise-form-control.component';
import { ExerciseInfo } from 'src/app/interfaces/ExerciseInfo';


@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  datesTrainings: Date[] = [];
  selectDate: Date = new Date();
  userId: string = '';
  trainingsData: Training[] = [];
  selectTraining: AbstractControl | null = null;
  ti: number = 0;
  loading: boolean = false;
  private destroy$ = new Subject();

  constructor(private route: ActivatedRoute,
    private trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading = true
    this.form = new FormGroup({
      userId: new FormControl(''),
      trainings: new FormArray([])
    });
    this.initDataTrainings();

  }

  initTraining(date: Date = new Date()) {
    return new FormGroup({
      date: new FormControl(date, Validators.required),
      exercises: new FormArray([])
    });
  }

  initDataTrainings() {
    this.form.disable();
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.form.controls['userId'].setValue(params['id']);
            return this.trainingService.getByIdUser(params['id']);
          }
        ),
        takeUntil(this.destroy$),
      ).subscribe(
        trainings => {
          if (trainings) {
            this.loading = false;
            this.trainingsData = trainings;
            this.inintValueFormTrainings();
            trainings.forEach((value, index) => {
              this.datesTrainings.push(value.date)
              if (this.checkDate(this.selectDate, new Date(value.date))) {
                this.ti = index;
                this.selectTraining = this.getTrainings().controls[index];
              }
            })
          }
          this.form.enable();
          this.cdr.detectChanges();
        },
        error => {
          this._snackBar.open(error.error.message, 'Закрыть', {
            verticalPosition: 'top',
            duration: 3000
          })
        }
      );
  }

  inintValueFormTrainings() {
    this.clearForm();
    this.trainingsData.forEach((t) => {
      let training: FormGroup = this.initTraining();
      this.getTrainings().push(training);

      t.exercises.forEach((e) => {
        let exercise = ExerciseFormControlComponent.buildExercise() as FormGroup
        (training.get('exercises') as FormArray).push(exercise);

        e.approaches.forEach((a) => {
          (exercise.get('approaches') as FormArray).push(ApproacheFormControlComponent.buildApproache());
        })
      })
    })
    this.form.patchValue({ user: this.userId, trainings: this.trainingsData });
    this.onSelectDate(this.selectDate);
  }

  onSelectDate(value: any) {
    this.selectDate = value;
    for (let i = 0; i < this.form.get('trainings')?.value.length; i++) {
      if (this.checkDate(new Date(this.form.get('trainings')?.value[i].date), new Date(value))) {
        this.ti = i;
        this.selectTraining = this.getTrainings().controls[i];
        break;
      }
      this.selectTraining = null;
    }
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesTrainings
        .map(strDate => new Date(strDate))
        .some(d => this.checkDate(d, date));
      return highlightDate ? 'special-date' : '';
    };
  }

  checkDate(dateOne: Date, dateTwo: Date) {
    return dateOne.getDate() === dateTwo.getDate() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getFullYear() === dateTwo.getFullYear()
  }

  onSubmit() {
    this.form.disable();
    this.trainingService.save(this.form.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        this._snackBar.open(res.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        });

      },
      (error) => {
        this._snackBar.open(error.error.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        });
      }
    ).add(() => {
      this.form.enable();
      this.cdr.detectChanges();
    });
  }

  refreshForm() {
    if (confirm('Вы уверены что хотите сбросить изминения?')) {
      this.inintValueFormTrainings();
      this.onSelectDate(this.selectDate);
      this.datesTrainings = [];
      this.trainingsData.forEach((value) => {
        this.datesTrainings.push(value.date);
      });
    }
  }

  clearForm() {
    this.getTrainings().clear();
  }

  setTraining(i: number, data: any) {
    this.getTrainings().at(i).setValue(data);
  }

  getTrainings() {
    return this.form.get('trainings') as FormArray;
  }

  getExercises(i: number) {
    return this.getTrainings().at(i).get('exercises') as FormArray;
  }

  addTraining() {
    this.datesTrainings.push(this.selectDate);
    this.getTrainings().push(this.initTraining(this.selectDate));
    this.ti = this.getTrainings().length - 1;
    this.selectTraining = this.getTrainings().at(this.ti);
  }

  removeTraining(i: number) {
    this.getTrainings().removeAt(i);
  }

  removeExercises(i: number) {
    this.getExercises(i).clear();
  }

  addExercise(i: number, exercise: ExerciseInfo) {
    const candidate = this.getExercises(i).controls
      .find(e => e.get('exerciseId')?.value == exercise._id);
    if (candidate) {
      return;
    }
    this.getExercises(i).push(
      ExerciseFormControlComponent.buildExercise(
        { exerciseId: exercise._id!, name: exercise.name, approaches: [] }
      )
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
