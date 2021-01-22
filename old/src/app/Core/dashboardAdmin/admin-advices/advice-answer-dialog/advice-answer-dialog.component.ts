import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminserviceService } from '../../adminservice.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-advice-answer-dialog',
  templateUrl: './advice-answer-dialog.component.html',
  styleUrls: ['./advice-answer-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class AdviceAnswerDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    answer: [
      {type: 'required', message: 'پاسخ را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public messageService: MessageService,
              public config: DynamicDialogConfig,
              public dialogRef: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      answer: new FormControl(
        this.config.data.answer,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    this.service.answerAdvice(this.config.data.id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
