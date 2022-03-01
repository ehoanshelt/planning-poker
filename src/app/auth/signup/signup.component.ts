import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StrapiService } from '../../services/strapi.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message:string = '';

  signupForm = new FormGroup({
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
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  })

  constructor(private strapiService: StrapiService) { }

  ngOnInit(): void {
  }

  addUser(data:any){
      const {email, password} = this.signupForm.controls;
      const userData = {username: email.value, email: email.value, password: password.value, confirmed: true}
      this.strapiService.addUser(userData).pipe(
        catchError(err => {
          if(err.status === 400){
            this.message = "It appears this email is taken. Please try again.";
            this.signupForm.controls['email'].setValue('');
          }
          throw err.status + " - looks like username is taken";
        }),
        tap(response => {
          console.log('Lets login the user');
        })
      ).subscribe((response) => {})
  }

}
