import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GameNewComponent } from './game-new/game-new.component';
import { GameModifyComponent } from './game-modify/game-modify.component';
import { GameDeleteComponent } from './game-delete/game-delete.component';
import { GameShowComponent } from './game-show/game-show.component';
import { GameHomeComponent } from './game-home/game-home.component';
import { GameIndexComponent } from './game-index/game-index.component';


@NgModule({
  declarations: [
    GameNewComponent,
    GameModifyComponent,
    GameDeleteComponent,
    GameShowComponent,
    GameHomeComponent,
    GameIndexComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
