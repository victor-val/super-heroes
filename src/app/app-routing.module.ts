import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesComponent } from './modules/heroes/pages/super-heroes/super-heroes.component';
import { FormSuperHeroeComponent } from './modules/heroes/pages/form-super-heroe/form-super-heroe.component';

const routes: Routes = [
  { path: '', component: SuperHeroesComponent },
  { path: 'crear-heroe', component: FormSuperHeroeComponent },
  { path: 'editar-heroe/:id', component: FormSuperHeroeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
