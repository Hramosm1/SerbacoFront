import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoscfComponent } from './pedidoscf.component';

describe('PedidoscfComponent', () => {
  let component: PedidoscfComponent;
  let fixture: ComponentFixture<PedidoscfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoscfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoscfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
