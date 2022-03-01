import { Component, OnInit } from '@angular/core';
import { StrapiService } from 'src/app/services/strapi.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private strapiService:StrapiService, private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.cookieService.delete('ppjwt');
    this.strapiService.isAuth$.next(false);
    setTimeout(() => {
      this.router.navigateByUrl('signin')
    }, 700);
  }

}
