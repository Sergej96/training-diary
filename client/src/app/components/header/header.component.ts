import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn: boolean = this.authService.isLoggedIn();

  openPageLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
