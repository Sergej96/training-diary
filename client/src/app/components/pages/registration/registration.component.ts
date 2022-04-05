import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup
  minDate!: Date;
  maxDate!: Date;

  constructor(private auth: AuthService, private router: Router) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 16, 0, 1);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}')
      ]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthdate: new FormControl()
    });
  }

  onSubmitRegister(){
    this.registerForm.disable()
    this.auth.register(this.registerForm.value).subscribe(
      () => {
        this.router.navigate(['login'], {
          queryParams: {
            registered: true
          }
        })
      },
      (res) => {
        alert(res.error.message)
      }
    )
  }



}
