import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAddDialogComponent } from './notification-add-dialog.component';

describe('NotificationAddDialogComponent', () => {
  let component: NotificationAddDialogComponent;
  let fixture: ComponentFixture<NotificationAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
