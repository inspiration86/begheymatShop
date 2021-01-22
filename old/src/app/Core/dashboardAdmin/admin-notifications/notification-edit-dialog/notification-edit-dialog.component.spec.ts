import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEditDialogComponent } from './notification-edit-dialog.component';

describe('NotificationEditDialogComponent', () => {
  let component: NotificationEditDialogComponent;
  let fixture: ComponentFixture<NotificationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
