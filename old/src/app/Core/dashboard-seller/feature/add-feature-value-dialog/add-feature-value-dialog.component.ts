import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-feature-value-dialog',
  templateUrl: './add-feature-value-dialog.component.html',
  styleUrls: ['./add-feature-value-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class AddFeatureValueDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    value: [
      {type: 'required', message: 'مقدار ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'مقدار ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public sellerService: SellerService,
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
    this.sellerService.addFeatureValue(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
