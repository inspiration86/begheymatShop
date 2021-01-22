import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeatureValueDialogComponent } from './add-feature-value-dialog.component';

describe('AddFeatureValueDialogComponent', () => {
  let component: AddFeatureValueDialogComponent;
  let fixture: ComponentFixture<AddFeatureValueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeatureValueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeatureValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
