import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  userInfo$!: Observable<User>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userInfo$ = this.userService.userInfo()
  }

}
