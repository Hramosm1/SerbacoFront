import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifadoComponent } from './tarifado.component';

describe('TarifadoComponent', () => {
  let component: TarifadoComponent;
  let fixture: ComponentFixture<TarifadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
