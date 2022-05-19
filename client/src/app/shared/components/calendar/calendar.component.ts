import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  @Input() selectDate: Date = new Date()
  @Input() dateClass!: MatCalendarCellClassFunction<Date>
  @Output() selectedChange = new EventEmitter<Date>();

  change(increased: Date | null) {
    if (increased) {
      this.selectedChange.emit(increased)
    }
  }
}
