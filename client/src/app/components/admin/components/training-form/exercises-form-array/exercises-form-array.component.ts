import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Exercise } from 'src/app/interfaces/Exercise';


@Component({
  selector: 'app-exercises-form-array',
  templateUrl: './exercises-form-array.component.html',
  styleUrls: ['./exercises-form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesFormArrayComponent implements AfterContentChecked {

  @Input()
  itemsFormArray: FormArray = new FormArray([]);

  @Input()
  exercises: Exercise[] | undefined;

  @Input()
  trainingIndex: number = 0;

  preLength: number = this.itemsFormArray.length;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterContentChecked(): void {
    this.cdr.markForCheck();
  }

  removeExercises() {
    this.itemsFormArray.clear();
  }

  trackExercise(index: number) {
    return index;
  }

  static buildExercises(fg?: FormGroup) {
    return fg ? new FormArray([fg]) : new FormArray([]);
  }

}
