import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FiltroBusquedaSuperHeroesComponent } from '../../components/filtro-busqueda-super-heroes/filtro-busqueda-super-heroes.component';
import { TablaSuperHeroesComponent } from '../../components/tabla-super-heroes/tabla-super-heroes.component';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { SuperHeroeService } from '../../services/super-heroe.service';

@Component({
  selector: 'app-super-heroes',
  standalone: true,
  imports: [FiltroBusquedaSuperHeroesComponent, TablaSuperHeroesComponent],
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.css',
})
export class SuperHeroesComponent implements OnInit {
  ngOnInit() {
    this.getSuperHeroes().subscribe((data) => console.log(data));
  }
  constructor(private superheroService: SuperHeroeService) {}

  getSuperHeroes(): Observable<SuperHero[]> {
    return this.superheroService.getSuperHeroes();
  }
}
