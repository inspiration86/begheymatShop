import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFeatureComponent } from './seller-feature.component';

describe('SellerFeatureComponent', () => {
  let component: SellerFeatureComponent;
  let fixture: ComponentFixture<SellerFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
