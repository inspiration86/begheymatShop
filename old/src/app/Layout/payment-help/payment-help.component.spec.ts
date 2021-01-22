import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHelpComponent } from './payment-help.component';

describe('PaymentHelpComponent', () => {
  let component: PaymentHelpComponent;
  let fixture: ComponentFixture<PaymentHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
