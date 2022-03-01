import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StrapiService } from 'src/app/services/strapi.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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

  constructor(private strapiService:StrapiService) { }

  ngOnInit(): void {
  }

  loginUser(){
    const {email, password} = this.signinForm.controls;
    this.strapiService.loginUser({identifier: email.value, password: password.value}).subscribe((response) => {
      console.log(response);
    })
  }

}
