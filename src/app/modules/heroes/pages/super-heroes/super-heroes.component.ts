import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TablaSuperHeroesComponent } from '../../components/tabla-super-heroes/tabla-super-heroes.component';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { FilterHeroPipe } from '../../pipes/filter-hero.pipe';
import { SpinnerHandlerService } from '../../../../shared/services/spinner-handler.service';

@Component({
  selector: 'app-super-heroes',
  standalone: true,
  imports: [
    CommonModule,
    TablaSuperHeroesComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    FilterHeroPipe,
    RouterLink,
    MessagesModule,
  ],
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.css',
  providers: [MessageService],
})
export class SuperHeroesComponent implements OnInit, OnDestroy {
  superHeroes: SuperHero[] = [];
  nombreBusqueda!: string;
  @ViewChild('superHeroeSearchInput', { static: true })
  superHeroeSearchInput!: ElementRef;
  superHeroeSuscription!: Subscription;
  spinnerActive: boolean = true;

  constructor(
    private superheroService: SuperHeroeService,
    public spinnerHandler: SpinnerHandlerService
  ) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

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
        switchMap(() => this.getSuperHeroes())
      )
      .subscribe((superHeroes: SuperHero[]) => {
        this.superHeroes = superHeroes !== undefined ? superHeroes : [];
      });
  }

  getSuperHeroes(): Observable<SuperHero[]> {
    return this.superheroService.getSuperHeroes();
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
  };

  update(): void {
    this.getSuperHeroes().subscribe((data) => (this.superHeroes = data));
  }

  ngOnDestroy(): void {
    this.superHeroeSuscription.unsubscribe();
  }
}
