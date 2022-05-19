import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Approache } from "src/app/interfaces/Approache";

@Component({
  selector: 'app-approaches-list',
  templateUrl: './approaches-list.component.html',
  styleUrls: ['./approaches-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApproachesListComponent {

  displayedColumns: string[] = ['index', 'repeat', 'weight', 'breakBeforeInSec']

  @Input()
  public approachesList: Approache[] = []

  trackApproache(index: number){
    return index
  }

}
