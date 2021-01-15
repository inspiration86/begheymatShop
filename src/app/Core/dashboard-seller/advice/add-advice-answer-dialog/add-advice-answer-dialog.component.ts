import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SellerService } from '../../seller.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-advice-answer-dialog',
  templateUrl: './add-advice-answer-dialog.component.html',
  styleUrls: ['./add-advice-answer-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class AddAdviceAnswerDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    answer: [
      {type: 'required', message: 'پاسخ را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
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
    this.sellerService.answerProductAdvice(this.config.data.id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
