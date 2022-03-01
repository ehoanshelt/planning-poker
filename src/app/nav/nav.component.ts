import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiService } from '../services/strapi.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthenticated? : Observable<boolean>;

  constructor(private strapiService: StrapiService) { 
    this.isAuthenticated = this.strapiService.isAuthenticated();
  }

  ngOnInit(): void {
  }

}
