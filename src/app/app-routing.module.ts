import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './public/home-page/home-page.component';

const routes: Routes = [
  { path:'games', 
  loadChildren: () => import('./games/games.module').then((m) => m.GamesModule)},
  { path: '', component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
