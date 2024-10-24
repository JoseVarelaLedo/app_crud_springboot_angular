import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDepartamentoComponent } from './registrar-departamento.component';

describe('RegistrarDepartamentoComponent', () => {
  let component: RegistrarDepartamentoComponent;
  let fixture: ComponentFixture<RegistrarDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDepartamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
