import { Pipe, PipeTransform } from '@angular/core';
import { SuperHero } from '../interfaces/super-heroe.interface';

@Pipe({
  name: 'filterHeroPipe',
  standalone: true,
})
export class FilterHeroPipe implements PipeTransform {
  public transform(superHeroes: SuperHero[], filter: string) {
    if (!superHeroes || !superHeroes.length) return [];
    if (!filter) return superHeroes;
    return superHeroes.filter(
      (h) => h.nombre.toLowerCase().indexOf(filter.toLowerCase()) >= 0
    );
  }
}
