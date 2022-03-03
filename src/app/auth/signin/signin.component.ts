import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StrapiService } from 'src/app/services/strapi.service';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  message:string = "";

  signinForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(10),
      Validators.maxLength(60)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  })

  constructor(private strapiService:StrapiService, private cookieService:CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    const {email, password} = this.signinForm.controls;
    this.strapiService.loginUser({identifier: email.value, password: password.value}).pipe(
      catchError(err => {
        this.message = "Your username and password is incorrect";
        throw null;
      }),
      tap(response => {
        this.cookieService.set('ppjwt', response['jwt'], {expires: 7});
        this.strapiService.userID = response['user'].id;
        this.strapiService.isAuth$.next(true);
      }),
      take(1),
      tap(response => {
        this.router.navigateByUrl('/games');
      })
    ).subscribe()
  }

}
