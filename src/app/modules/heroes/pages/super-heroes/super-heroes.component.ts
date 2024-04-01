import { Component } from '@angular/core';
import { FiltroBusquedaSuperHeroesComponent } from '../../components/filtro-busqueda-super-heroes/filtro-busqueda-super-heroes.component';
import { TablaSuperHeroesComponent } from '../../components/tabla-super-heroes/tabla-super-heroes.component';

@Component({
  selector: 'app-super-heroes',
  standalone: true,
  imports: [FiltroBusquedaSuperHeroesComponent, TablaSuperHeroesComponent],
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.css',
})
export class SuperHeroesComponent {}
