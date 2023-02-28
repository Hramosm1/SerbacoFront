import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomiciliarComponent } from './domiciliar.component';

describe('DomiciliarComponent', () => {
  let component: DomiciliarComponent;
  let fixture: ComponentFixture<DomiciliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomiciliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomiciliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
