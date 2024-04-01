import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperHeroeComponent } from './create-super-heroe.component';

describe('CreateSuperHeroeComponent', () => {
  let component: CreateSuperHeroeComponent;
  let fixture: ComponentFixture<CreateSuperHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSuperHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSuperHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
