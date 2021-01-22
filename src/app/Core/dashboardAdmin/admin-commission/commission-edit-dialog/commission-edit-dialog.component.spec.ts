import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionEditDialogComponent } from './commission-edit-dialog.component';

describe('CommissionEditDialogComponent', () => {
  let component: CommissionEditDialogComponent;
  let fixture: ComponentFixture<CommissionEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
