import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionAddDialogComponent } from './commission-add-dialog.component';

describe('CommissionAddDialogComponent', () => {
  let component: CommissionAddDialogComponent;
  let fixture: ComponentFixture<CommissionAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
