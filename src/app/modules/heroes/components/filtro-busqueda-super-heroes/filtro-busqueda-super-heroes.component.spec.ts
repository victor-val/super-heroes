import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBusquedaSuperHeroesComponent } from './filtro-busqueda-super-heroes.component';

describe('FiltroBusquedaSuperHeroesComponent', () => {
  let component: FiltroBusquedaSuperHeroesComponent;
  let fixture: ComponentFixture<FiltroBusquedaSuperHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroBusquedaSuperHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroBusquedaSuperHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
