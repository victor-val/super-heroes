import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-super-heroe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    InputNumberModule,
    MessagesModule,
    RouterLink,
  ],
  templateUrl: './form-super-heroe.component.html',
  styleUrl: './form-super-heroe.component.css',
  providers: [MessageService],
})
export class FormSuperHeroeComponent implements OnInit, OnDestroy {
  frm!: FormGroup;
  superHeroSel!: SuperHero;
  nuevo: boolean = false;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private superHeroeService: SuperHeroeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.sub = this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (isNaN(id)) {
        this.nuevo = true;
      } else {
        this.superHeroeService.getSuperHeroe(id).subscribe(
          (superHeroe) => {
            this.nuevo = false;
            this.superHeroSel = superHeroe;
            this.createFormGroup();
          },
          (err) => {
            this.nuevo = true;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No existe el superHeroe',
            });
          }
        );
      }
    });
  }

  createFormGroup() {
    this.frm = new FormGroup({
      nombre: new FormControl(
        this.superHeroSel ? this.superHeroSel.nombre : '',
        { validators: [Validators.required] }
      ),
      vuela: new FormControl(
        this.superHeroSel ? this.superHeroSel.vuela : false
      ),
      disponible: new FormControl(
        this.superHeroSel ? this.superHeroSel.disponible : false
      ),
      telefono: new FormControl(
        this.superHeroSel ? this.superHeroSel.telefono : null
      ),
    });
  }

  insertar() {
    const id = Math.floor(Math.random() * (500 - 1) + 1);
    const nombre = this.frm.get('nombre')?.value;
    const vuela = this.frm.get('vuela')?.value;
    const disponible = this.frm.get('disponible')?.value;
    const telefono = this.frm.get('telefono')?.value;
    const sp: SuperHero = { id, nombre, vuela, disponible, telefono };
    this.superHeroeService.insertSuperHeroe(sp).subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Añadido',
          detail: 'Super heroe añadido con éxito',
        });
      }
    });
    this.clean();
  }

  actualizar() {
    this.superHeroSel.nombre = this.frm.get('nombre')?.value;
    this.superHeroSel.vuela = this.frm.get('vuela')?.value;
    this.superHeroSel.disponible = this.frm.get('disponible')?.value;
    this.superHeroSel.telefono = this.frm.get('telefono')?.value;
    this.superHeroeService
      .updateSuperHeroe(this.superHeroSel)
      .subscribe((res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: 'Super heroe actualizado con éxito',
          });
        }
      });
  }

  clean() {
    this.frm.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
