import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDepartamentoComponent } from './actualizar-departamento.component';

describe('ActualizarDepartamentoComponent', () => {
  let component: ActualizarDepartamentoComponent;
  let fixture: ComponentFixture<ActualizarDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarDepartamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
