import { Component, OnInit } from '@angular/core';
import { StrapiService } from 'src/app/services/strapi.service';
import { tap, catchError, take } from 'rxjs';


@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})
export class GameHomeComponent implements OnInit {
  
  usersGameData:any;

  constructor(private strapiService:StrapiService) { }

  ngOnInit(): void {
    this.strapiService.getUserID().pipe(
      tap(response => {
        this.strapiService.userID = response.id.toString();
        this.getUsersGames();
      }),
      catchError((err) => {
        throw "Couldn't fetch user id: " + err;
      })
    ).subscribe();
  }

  getUsersGames(){
    this.strapiService.getUserGames(this.strapiService.userID).pipe(
      tap((response) => {
        this.usersGameData = response;
      }),
      catchError((err) => {
        throw "Couldn't fetch the users games";
      })
    ).subscribe();
  }
}
