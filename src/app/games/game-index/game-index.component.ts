import { Component, OnInit, Input} from '@angular/core';
import { StrapiService } from 'src/app/services/strapi.service';



@Component({
  selector: 'app-game-index',
  templateUrl: './game-index.component.html',
  styleUrls: ['./game-index.component.scss']
})
export class GameIndexComponent implements OnInit {

  @Input() set data(value:any){
    if(value != undefined){
      this.gameData = value.data;
      return;
    }
  }

  gameData:any;


  constructor(private strapiService: StrapiService) {}

  ngOnInit(): void {
  }
}
