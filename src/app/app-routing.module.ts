import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesComponent } from './modules/heroes/pages/super-heroes/super-heroes.component';
import { CreateSuperHeroeComponent } from './modules/heroes/pages/create-super-heroe/create-super-heroe.component';

const routes: Routes = [
  { path: '', component: SuperHeroesComponent },
  { path: 'crear-heroe', component: CreateSuperHeroeComponent },
  { path: 'editar-heroe/:id', component: CreateSuperHeroeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
