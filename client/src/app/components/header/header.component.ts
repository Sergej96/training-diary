import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }
}
