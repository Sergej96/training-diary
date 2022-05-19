import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormArray } from "@angular/forms";
import { Approache } from "src/app/interfaces/Approache";
import { ApproacheFormControlComponent } from "./approache-form-control/approache-form-control.component";

@Component({
  selector: 'app-approaches-form-array',
  templateUrl: './approaches-form-array.component.html',
  styleUrls: ['./approaches-form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class ApproachesFormArrayComponent {

  @Input()
  public itemsFormArray: FormArray = new FormArray([]);

  addApproache() {
    this.itemsFormArray.push(ApproacheFormControlComponent.buildApproache());
  }

  trackApproache(index: number){
    return index;
  }

}
