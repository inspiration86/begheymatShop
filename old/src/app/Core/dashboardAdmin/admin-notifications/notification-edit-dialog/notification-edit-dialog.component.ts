import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-notification-edit-dialog',
  templateUrl: './notification-edit-dialog.component.html',
  styleUrls: ['./notification-edit-dialog.component.css'],
  providers:[MessageService]
})
export class NotificationEditDialogComponent implements OnInit {

  notification: any;
  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان اطلاعیه را وارد کنید.'}
    ],
    description: [
      {type: 'required', message: 'متن اطلاعیه را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.notification = this.config.data.notification
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(
        this.notification.title,
        [
          Validators.required
        ]
      ),
      date: new FormControl(
        this.notification.date
      ),
      description: new FormControl(
        this.notification.description,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    this.service.editNotification(this.notification._id ,this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
