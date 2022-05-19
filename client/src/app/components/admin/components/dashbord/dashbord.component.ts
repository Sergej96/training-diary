import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashbordService } from 'src/app/services/dashbord.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashbordComponent implements OnInit {

  countUser$!: Observable<number>
  countExercise$!: Observable<number>

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dashboardService: DashbordService
  ) { }

  ngOnInit(): void {
    this.countUser$ = this.dashboardService.getCountUser()
    this.countExercise$ = this.dashboardService.getCountExercise()
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Всего клиентов', cols: 1, rows: 1, count: this.countUser$ },
          { title: 'Всего упражнений', cols: 1, rows: 1, count: this.countExercise$ }
        ];
      }

      return [
        { title: 'Всего клиентов', cols: 1, rows: 1, count: this.countUser$ },
        { title: 'Всего упражнений', cols: 1, rows: 1, count: this.countExercise$ }
      ];
    })
  );

}
