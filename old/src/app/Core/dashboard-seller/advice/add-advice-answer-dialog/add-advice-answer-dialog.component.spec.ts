import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdviceAnswerDialogComponent } from './add-advice-answer-dialog.component';

describe('AddAdviceAnswerDialogComponent', () => {
  let component: AddAdviceAnswerDialogComponent;
  let fixture: ComponentFixture<AddAdviceAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdviceAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdviceAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
