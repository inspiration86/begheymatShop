import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSellerContractsComponent } from './admin-seller-contracts.component';

describe('AdminSellerContractsComponent', () => {
  let component: AdminSellerContractsComponent;
  let fixture: ComponentFixture<AdminSellerContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSellerContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellerContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
