import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  currentYear: number = new Date().getFullYear();
  minDate: Date = new Date(this.currentYear - 100, 0, 1);
  maxDate: Date = new Date(this.currentYear - 16, 0, 1);
  destroy$ = new Subject();
  regPassword: string = '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'

  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  onSubmitRegister() {
    this.registerForm.disable()
    this.auth.register(this.registerForm.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.router.navigate(['login'], {
          queryParams: {
            registered: true
          }
        })
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Закрыть', {
          verticalPosition: 'top',
          duration: 3000
        })
      }
    )
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.regPassword)
      ]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthdate: new FormControl()
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
