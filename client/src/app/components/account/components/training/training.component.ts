import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject, takeUntil } from 'rxjs';
import { Training } from 'src/app/interfaces/Training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit, OnDestroy {

  trainingsData: Training[] = []
  selectTraining: Training | null = null
  loading: boolean = false
  destroy$ = new Subject()
  datesTrainings: Date[] = []
  selectDate: Date = new Date()

  constructor(
    private trainingService: TrainingService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.initDataTrainings()
  }

  initDataTrainings() {
    this.trainingService.getUser()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        trainings => {
          if (trainings) {
            this.loading = false;
            this.trainingsData = trainings
            trainings.forEach((value) => {
              this.datesTrainings.push(value.date)
              if(this.checkDate(this.selectDate, new Date(value.date))){
                this.selectTraining = value
              }
            })
          }
          this.cdr.detectChanges()
        },
        error => {
          this._snackBar.open(error.error.message, 'Закрыть', {
            verticalPosition: 'top',
            duration: 3000
          })
        }
      )
  }

  checkDate(dateOne: Date, dateTwo: Date) {
    return dateOne.getDate() === dateTwo.getDate() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getFullYear() === dateTwo.getFullYear()
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesTrainings
        .map(strDate => new Date(strDate))
        .some(d => this.checkDate(d, date));
      return highlightDate ? 'special-date' : '';
    };
  }

  onSelectDate(value: any) {
    this.selectDate = value
    for(let i = 0; i < this.datesTrainings.length; i++){
      if(this.checkDate(new Date(this.trainingsData[i].date), new Date(value))){
        this.selectTraining = this.trainingsData[i]
        break
      }
      this.selectTraining = null
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
