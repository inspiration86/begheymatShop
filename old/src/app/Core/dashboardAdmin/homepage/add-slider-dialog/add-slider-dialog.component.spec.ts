import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSliderDialogComponent } from './add-slider-dialog.component';

describe('AddSliderDialogComponent', () => {
  let component: AddSliderDialogComponent;
  let fixture: ComponentFixture<AddSliderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSliderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSliderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
