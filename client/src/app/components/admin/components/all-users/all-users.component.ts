import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllUsersComponent implements OnInit {

  users$!: Observable<User[]>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.allUser()
  }

  trackUser(index:number){
    return index
  }
}
