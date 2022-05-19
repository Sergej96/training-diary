import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  hidePassword: Boolean = true;
  destroy$ = new Subject()
  regPassword: string = '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'

  constructor(
    private authService: AuthService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  onSubmitLogin() {
    this.loginForm.disable();
    this.authService.login(this.loginForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (res) => {
        if (res.role == 'ADMIN') {
          this.router.navigate(['admin'])
        }
        else {
          this.router.navigate(['account'])
        }
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Закрыть', {
          verticalPosition: 'top'
        })
        this.loginForm.enable()
      }
    )
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [
        Validators.required,
        Validators.pattern(this.regPassword)
      ])
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['account']);
    }

    this.activedRoute.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params) => {
      if (params['registered']) {
        this._snackBar.open('Авторизуйтесь чтобы войти в свой аккаунт', 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      } else if (params['unauthorized']) {
        this._snackBar.open('Пожалуйста авторизуйтесь', 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      } else if (params['sessionEnd']) {
        this._snackBar.open('Время сессии закончилось', 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
