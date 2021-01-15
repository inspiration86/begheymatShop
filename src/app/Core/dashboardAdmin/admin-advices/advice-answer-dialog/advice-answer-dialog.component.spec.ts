import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceAnswerDialogComponent } from './advice-answer-dialog.component';

describe('AdviceAnswerDialogComponent', () => {
  let component: AdviceAnswerDialogComponent;
  let fixture: ComponentFixture<AdviceAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceAnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
