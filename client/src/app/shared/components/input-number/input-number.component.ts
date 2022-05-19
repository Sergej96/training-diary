import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumberComponent),
    multi: true
  }]
})
export class InputNumberComponent implements ControlValueAccessor {

  value: number = 0;

  private onChange!: (value: number) => void
  private onTouched!: () => void;

  @Input()
  requred: boolean = false

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  onInputValueChange(event: Event): void {
    const targetDivElement = event.target as HTMLInputElement;
    this.value = +targetDivElement.value;

    this.onChange(this.value);
  }

  writeValue(value: number): void {
    this.value = value;

    this.cdr.detectChanges();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onRemove() {
    this.onChange(--this.value)
  }

  onAdd() {
    this.onChange(++this.value)
  }
}
