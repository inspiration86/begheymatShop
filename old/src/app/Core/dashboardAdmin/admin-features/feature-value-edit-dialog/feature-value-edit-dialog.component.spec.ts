import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureValueEditDialogComponent } from './feature-value-edit-dialog.component';

describe('FeatureValueEditDialogComponent', () => {
  let component: FeatureValueEditDialogComponent;
  let fixture: ComponentFixture<FeatureValueEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureValueEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureValueEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
