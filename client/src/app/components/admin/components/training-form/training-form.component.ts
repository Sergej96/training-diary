import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators'
import { Training } from 'src/app/interfaces/Training';
import { TrainingService } from 'src/app/services/training.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Exercise } from 'src/app/interfaces/Exercise';


@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup
  trainings$!: Observable<Training[]>
  datesTrainings: Date[] = []
  selectDate: Date = new Date('2022-04-12')
  userId: string = ''
  trainingsData: Training[] = []
  selectTraining: AbstractControl | null = null
  ti: number = 0
  loading: boolean = false
  destroy$: Subject<unknown> = new Subject()

  constructor(private route: ActivatedRoute,
    private trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading = true
    this.form = new FormGroup({
      userId: new FormControl(''),
      trainings: new FormArray([])
    })
    this.initDataTrainings()
  }

  initTraining(date: Date = new Date()) {
    return new FormGroup({
      date: new FormControl(date, Validators.required),
      exercises: new FormArray([])
    })
  }

  initExercise(exercise?: Exercise) {
    return new FormGroup({
      exerciseId: new FormControl(exercise?._id, Validators.required),
      name: new FormControl(exercise?.name, Validators.required),
      approaches: new FormArray([])
    })
  }

  initApproache() {
    return new FormGroup({
      weight: new FormControl('', [Validators.required]),
      breakBeforeInSec: new FormControl('55', Validators.required),
      repeat: new FormControl('', Validators.required)
    })
  }

  initDataTrainings() {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            this.form.controls['userId'].setValue(params['id'])
            return this.trainingService.getByUser(params['id'])
          }
        ),
        takeUntil(this.destroy$)
      ).subscribe(
        trainings => {
          if (trainings) {
            this.loading = false
            this.trainingsData = trainings
            this.inintValueFormTrainings()
            trainings.forEach((value, index) => {
              this.datesTrainings.push(value.date)
              if (this.checkDate(this.selectDate, new Date(value.date))) {
                this.ti = index;
                this.selectTraining = this.getTrainings().controls[index]
                this.cdr.detectChanges()

              }
            })
          }
          this.form.enable()
        },
        error => {
          this._snackBar.open(error.error.message, 'Закрыть', {
            verticalPosition: 'top',
            duration: 3000
          })
        }
      )

  }

  inintValueFormTrainings() {
    this.clearForm()

    this.trainingsData.forEach((t) => {
      let training: FormGroup = this.initTraining();
      this.getTrainings().push(training);

      t.exercises.forEach((e) => {
        let exercise = this.initExercise();
        (training.get('exercises') as FormArray).push(exercise)

        e.approaches.forEach((a) => {
          (exercise.get('approaches') as FormArray).push(this.initApproache())
        })
      })
    })
    this.form.patchValue({ user: this.userId, trainings: this.trainingsData });
    this.cdr.detectChanges()
  }

  onSelectDate(value: any) {
    this.selectDate = value
    for (let i = 0; i < this.form.get('trainings')?.value.length; i++) {
      if (this.checkDate(new Date(this.form.get('trainings')?.value[i].date), new Date(value))) {
        this.ti = i
        this.selectTraining = this.getTrainings().controls[i]
        break
      }
      this.selectTraining = null
    }
    console.log(this.form);
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
    this.form.disable()

    return this.trainingService.save(this.form.value).subscribe(
      (res) => {
        this._snackBar.open(res.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      }
    ).add(this.form.enable())
  }

  refreshForm() {
    if (confirm('Вы уверены что хотите сбросить изминения?'))
      this.inintValueFormTrainings()
    this.onSelectDate(this.selectDate)
    this.datesTrainings = []
    this.trainingsData.forEach((value) => {
      this.datesTrainings.push(value.date)
    })
  }

  clearForm() {
    this.getTrainings().clear()
  }

  setTraining(i: number, data: any) {
    this.getTrainings().at(i).setValue(data)
  }

  getTrainings() {
    return this.form.get('trainings') as FormArray
  }

  getExercises(i: number) {
    return this.getTrainings().at(i).get('exercises') as FormArray
  }

  getApproaches(i: number, j: number) {
    return this.getExercises(i).at(j).get('approaches') as FormArray
  }

  addTraining() {
    this.datesTrainings.push(this.selectDate)
    this.getTrainings().push(this.initTraining(this.selectDate))
    this.ti = this.getTrainings().length - 1
    this.selectTraining = this.getTrainings().at(this.ti)
  }

  removeTraining(i: number) {
    this.getTrainings().removeAt(i)
  }

  addExercise(i: number, exercise: Exercise) {
    const candidate = this.getExercises(i).controls.find(e => e.get('exerciseId')?.value == exercise._id)
    if (candidate) {
      return
    }
    this.getExercises(i).push(this.initExercise(exercise))
  }

  removeExercises(i: number) {
    this.getExercises(i).clear()
  }

  removeExercise(i: number, j: number) {
    this.getExercises(i).removeAt(j)
  }

  addApproache(i: number, j: number) {
    this.getApproaches(i, j).push(this.initApproache())
  }

  removeApproache(i: number, j: number, k: number) {
    this.getApproaches(i, j).removeAt(k)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
