import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHomeComponent } from './game-home/game-home.component';
import { GameNewComponent } from './game-new/game-new.component';

const routes: Routes = [
  {path: 'new', component:GameNewComponent},
  {path: '', component:GameHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
