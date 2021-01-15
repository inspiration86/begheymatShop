import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHelpComponent } from './seller-help.component';

describe('SellerHelpComponent', () => {
  let component: SellerHelpComponent;
  let fixture: ComponentFixture<SellerHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
