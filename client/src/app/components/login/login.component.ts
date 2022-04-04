import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmitLogin(){
    this.loginForm.disable()
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['account']),
      error: (err) => {
        alert(err.message)
        this.loginForm.enable()
      }
    })
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [
        Validators.required, 
        Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}')
      ])
    });

    if (this.authService.isLoggedIn()){
      this.router.navigate(['account'])
    }
  }

}
