import { Component, Input } from '@angular/core';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-super-heroes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './tabla-super-heroes.component.html',
  styleUrl: './tabla-super-heroes.component.css',
})
export class TablaSuperHeroesComponent {
  @Input() superHeroes!: SuperHero[];
}
