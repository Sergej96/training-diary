import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: '.app-approache-form-control',
  templateUrl: './approache-form-control.component.html',
  styleUrls: ['./approache-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class  ApproacheFormControlComponent {

  @Input() index: number = 0;

  _item: FormGroup = new FormGroup({});

  @Input() set item(value: any){
    this._item = value as FormGroup;
  }
  get item(){
    return this._item as FormGroup;
  }

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  static buildApproache() {
    return new FormGroup({
      weight: new FormControl('', [Validators.required, Validators.min(1), Validators.max(300)]),
      repeat: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(100)]),
      breakBeforeInSec: new FormControl('60', [Validators.required, Validators.min(0)])
    });
  }
}
