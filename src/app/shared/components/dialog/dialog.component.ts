import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  providers: [DialogService],
})
export class DialogComponent implements OnInit {
  title!: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config && this.config.data) {
      this.title = this.config.data.title;
    }
  }

  aceptar() {
    this.ref.close(true);
  }

  cancelar() {
    this.ref.close(false);
  }
}
