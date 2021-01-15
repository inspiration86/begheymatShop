import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-notification-add-dialog',
  templateUrl: './notification-add-dialog.component.html',
  styleUrls: ['./notification-add-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class NotificationAddDialogComponent implements OnInit {
  date: any;
  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان اطلاعیه را وارد کنید.'}
    ],
    date: [
      {type: 'required', message: 'تاریخ اطلاعیه را وارد کنید.'}
    ],
    description: [
      {type: 'required', message: 'متن اطلاعیه را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      date: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      description: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    // console.log(this.form.value);
    this.service.addNotification(this.form.value).subscribe((response) => {
      console.log(this.form.value);
      console.log(response);
      if (response.success === true) {

        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
