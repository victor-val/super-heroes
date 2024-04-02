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
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SuperHeroeService } from '../../services/super-heroe.service';

@Component({
  selector: 'app-create-super-heroe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    InputNumberModule,
  ],
  templateUrl: './create-super-heroe.component.html',
  styleUrl: './create-super-heroe.component.css',
})
export class CreateSuperHeroeComponent implements OnInit, OnDestroy {
  frm!: FormGroup;
  superHeroSel!: SuperHero;
  nuevo: boolean = false;
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private superHeroeService: SuperHeroeService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.sub = this.route.params.subscribe((params) => {
      const id = +params['id'];
      if (isNaN(id)) {
        this.nuevo = true;
      } else {
        this.nuevo = false;
        this.superHeroeService.getSuperHeroe(id).subscribe((superHeroe) => {
          this.superHeroSel = superHeroe;
          this.createFormGroup();
        });
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
        console.log(res);
        //TODO notificacion
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
          console.log(res);
          //TODO notificacion
        }
        //TODO volver ?
      });
  }

  cancelar() {
    this.clean();
  }
  clean() {
    this.frm.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
