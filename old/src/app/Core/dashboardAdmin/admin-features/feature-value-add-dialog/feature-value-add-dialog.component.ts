import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AdminserviceService} from '../../adminservice.service';

@Component({
  selector: 'app-feature-value-add-dialog',
  templateUrl: './feature-value-add-dialog.component.html',
  styleUrls: ['./feature-value-add-dialog.component.css']
})
export class FeatureValueAddDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    value: [
      {type: 'required', message: 'مقدار ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'مقدار ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
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
      featuresID: new FormControl(
        this.config.data.featureId
      ),
      value: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      )
    });
  }

  submitForm(): void {
    this.service.addFeatureValue(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
