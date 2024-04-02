import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuperHero } from '../../interfaces/super-heroe.interface';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CapitalizeFirstLetterPipe } from '../../../../shared/pipes/capitalize-first-letter.pipe';
import { SuperHeroeService } from '../../services/super-heroe.service';
import { MessageService } from 'primeng/api';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

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
    DialogModule,
    CapitalizeFirstLetterPipe,
    RouterLink,
  ],
  templateUrl: './tabla-super-heroes.component.html',
  styleUrl: './tabla-super-heroes.component.css',
  providers: [DialogService],
})
export class TablaSuperHeroesComponent {
  @Input() superHeroes!: SuperHero[];
  @Output() update = new EventEmitter();
  idSeleccionado!: number;
  showDetalleSuperHeroe: boolean = false;
  displayConfirmacionBorrado: boolean = false;

  constructor(
    private superHeroesService: SuperHeroeService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  eliminar(id: number): void {
    this.idSeleccionado = id;
    const ref = this.dialogService.open(DialogComponent, {
      header: 'Confirmación',
      width: '25vw',
      data: {
        title: '¿Confirma que desea borrar el super heroe?',
      },
    });

    ref.onClose.subscribe((nextStep: boolean) => {
      if (nextStep) {
        this.confirmacionBorrarSuperHeroe();
      }
    });
    this.displayConfirmacionBorrado = true;
  }

  confirmacionBorrarSuperHeroe() {
    this.displayConfirmacionBorrado = false;
    this.superHeroesService
      .deleteSuperHeroe(this.idSeleccionado)
      .subscribe((res: SuperHero) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Borrado',
            detail: 'Super heroe borrado con éxito',
          });
        }
        this.update.emit();
      });
  }
}
