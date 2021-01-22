import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSliderDialogComponent } from './edit-slider-dialog.component';

describe('EditSliderDialogComponent', () => {
  let component: EditSliderDialogComponent;
  let fixture: ComponentFixture<EditSliderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSliderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSliderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
