import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSellerComponent } from './admin-edit-seller.component';

describe('AdminEditSellerComponent', () => {
  let component: AdminEditSellerComponent;
  let fixture: ComponentFixture<AdminEditSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
