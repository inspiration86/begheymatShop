import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {AdminserviceService} from '../../adminservice.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-category-add-dialog',
  templateUrl: './category-add-dialog.component.html',
  styleUrls: ['./category-add-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class CategoryAddDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان دسته بندی را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      )
    });
  }

  submitForm(): void {
    this.service.addCategory(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
