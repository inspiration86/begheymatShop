import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionComponent } from './admin-commission.component';

describe('AdminCommissionComponent', () => {
  let component: AdminCommissionComponent;
  let fixture: ComponentFixture<AdminCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
