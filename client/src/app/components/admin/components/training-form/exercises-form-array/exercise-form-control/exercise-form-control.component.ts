import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Exercise } from "src/app/interfaces/Exercise";
import { ApproacheFormControlComponent } from "../../approaches-form-array/approache-form-control/approache-form-control.component";

@Component({
  selector: 'app-exercise-form-control',
  templateUrl: './exercise-form-control.component.html',
  styleUrls: ['./exercise-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExerciseFormControlComponent {

  _item: FormGroup = new FormGroup({});

  @Input()
  index: number = 0;

  @Input()
  exerciseName: string = "";

  @Input()
  set item(value: any) {
    this._item = value as FormGroup;
  }
  get item() {
    return this._item;
  }

  @Output()
  removed: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  static buildExercise(exercise?: Exercise): FormGroup {
    const approacheFormGroup = exercise ? [ApproacheFormControlComponent.buildApproache()] : []
    return new FormGroup({
      exerciseId: new FormControl(exercise?.exerciseId, Validators.required),
      name: new FormControl(exercise?.name),
      approaches: new FormArray(approacheFormGroup,Validators.required)
    })
  }

}
