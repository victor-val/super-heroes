import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SuperHero } from '../interfaces/super-heroe.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroeService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = environment.urlAPI;
  }

  getSuperHeroes(): Observable<SuperHero[]> {
    return this.http.get<SuperHero[]>(this.URL + '/superHeroes');
  }

  getSuperHeroe(id: number): Observable<SuperHero> {
    return this.http.get<SuperHero>(this.URL + '/superHeroes/' + id);
  }

  insertSuperHeroe(superHero: SuperHero): Observable<SuperHero> {
    return this.http.post<SuperHero>(this.URL + '/superHeroes/', superHero);
  }

  updateSuperHeroe(superHero: SuperHero): Observable<SuperHero> {
    return this.http.patch<SuperHero>(
      this.URL + '/superHeroes/' + superHero.id,
      superHero
    );
  }
}
