import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Observable,
  Subscription,
  debounceTime,
  distinct,
  filter,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TablaSuperHeroesComponent } from '../../components/tabla-super-heroes/tabla-super-heroes.component';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { FilterHeroPipe } from '../../pipes/filter-hero.pipe';

@Component({
  selector: 'app-super-heroes',
  standalone: true,
  imports: [
    TablaSuperHeroesComponent,
    FormsModule,
    InputTextModule,
    FilterHeroPipe,
  ],
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.css',
})
export class SuperHeroesComponent implements OnInit {
  superHeroes: SuperHero[] = [];
  nombreBusqueda!: string;
  @ViewChild('superHeroeSearchInput', { static: true })
  superHeroeSearchInput!: ElementRef;
  superHeroeSuscription!: Subscription;

  constructor(private superheroService: SuperHeroeService) {}

  ngOnInit() {
    this.getSuperHeroes().subscribe((data) => (this.superHeroes = data));

    this.superHeroeSuscription = fromEvent<Event>(
      this.superHeroeSearchInput.nativeElement,
      'keyup'
    )
      .pipe(
        map((event: Event) => {
          const searchTerm = (event.target as HTMLInputElement).value;
          return searchTerm;
        }),
        filter(
          (searchTerm: string) =>
            searchTerm.length > 2 || searchTerm.length === 0
        ),
        debounceTime(500),
        distinct(),
        switchMap((searchTerm: string) => {
          this.nombreBusqueda = searchTerm;
          return this.getSuperHeroes();
        })
      )
      .subscribe((superHeroes: SuperHero[]) => {
        this.superHeroes = superHeroes !== undefined ? superHeroes : [];
      });
  }

  getSuperHeroes(): Observable<SuperHero[]> {
    return this.superheroService.getSuperHeroes();
  }
}
