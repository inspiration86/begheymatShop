import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerContractEditDialogComponent } from './seller-contract-edit-dialog.component';

describe('SellerContractEditDialogComponent', () => {
  let component: SellerContractEditDialogComponent;
  let fixture: ComponentFixture<SellerContractEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerContractEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerContractEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
