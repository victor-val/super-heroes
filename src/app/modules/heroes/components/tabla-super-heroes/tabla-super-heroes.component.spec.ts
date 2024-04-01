import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSuperHeroesComponent } from './tabla-super-heroes.component';

describe('TablaSuperHeroesComponent', () => {
  let component: TablaSuperHeroesComponent;
  let fixture: ComponentFixture<TablaSuperHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaSuperHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaSuperHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
