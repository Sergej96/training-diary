import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const adminPath = route.routeConfig?.path

    if (!this.authService.isLoggedIn()){
      this.router.navigate(['login'], {
        queryParams: {
          unauthorized: true
        }
      });
      return false;
    }
    else if(adminPath == 'admin' && this.authService.checkAdmin()){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }

}
