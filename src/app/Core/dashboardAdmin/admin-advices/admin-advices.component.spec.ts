import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvicesComponent } from './admin-advices.component';

describe('AdminAdvicesComponent', () => {
  let component: AdminAdvicesComponent;
  let fixture: ComponentFixture<AdminAdvicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdvicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
