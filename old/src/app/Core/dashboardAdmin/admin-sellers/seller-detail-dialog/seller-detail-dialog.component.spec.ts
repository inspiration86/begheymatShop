import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDetailDialogComponent } from './seller-detail-dialog.component';

describe('SellerDetailDialogComponent', () => {
  let component: SellerDetailDialogComponent;
  let fixture: ComponentFixture<SellerDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
