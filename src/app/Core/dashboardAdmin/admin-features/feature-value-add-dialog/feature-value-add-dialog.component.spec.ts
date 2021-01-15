import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureValueAddDialogComponent } from './feature-value-add-dialog.component';

describe('FeatureValueAddDialogComponent', () => {
  let component: FeatureValueAddDialogComponent;
  let fixture: ComponentFixture<FeatureValueAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureValueAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureValueAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
