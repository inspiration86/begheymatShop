import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AdminserviceService} from '../../adminservice.service';

@Component({
  selector: 'app-feature-add-dialog',
  templateUrl: './feature-add-dialog.component.html',
  styleUrls: ['./feature-add-dialog.component.css']
})
export class FeatureAddDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    titleFarsi: [
      {type: 'required', message: 'عنوان فارسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان فارسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    titleLatin: [
      {type: 'required', message: 'عنوان انگلیسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان انگلیسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public service: AdminserviceService,
              public messageService: MessageService,
              public config: DynamicDialogConfig,
              public dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      titleFarsi: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      titleLatin: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      )
    });

  }

  submitForm(): void {
    this.service.addFeature(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
