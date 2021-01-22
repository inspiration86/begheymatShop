import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {MessageService} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-seller-contract-edit-dialog',
  templateUrl: './seller-contract-edit-dialog.component.html',
  styleUrls: ['./seller-contract-edit-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class SellerContractEditDialogComponent implements OnInit {

  contract : any;
  public form: FormGroup;
  errorMessages = {
    ContractCode: [
      {type: 'required', message: 'کد قرارداد را وارد کنید.'}
    ],
    ContractText: [
      {type: 'required', message: 'فایل قرارداد را آپلود کنید.'}
    ],
    startDate: [
      {type: 'required', message: 'تاریخ شروع را وارد کنید.'}
    ],
    endDate: [
      {type: 'required', message: 'تاریخ پایان را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public messageService: MessageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.contract = this.config.data.contract;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      ContractText: new FormControl(
        this.contract.ContractText,
        [
          Validators.required
        ]
      ),
      startDate: new FormControl(
        this.contract.startDate,
        [
          Validators.required
        ]
      ),
      endDate: new FormControl(
        this.contract.endDate,
        [
          Validators.required
        ]
      )
    });
  }

  submitForm(): void {
    this.service.editSellerContract(this.contract._id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }


  fileUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    console.log(event.files[0]);
    this.service.uploadFile(formData).subscribe((response) => {
      console.log(response);
      if (response.success === true) {
        this.form.controls.ContractText.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود فایل قرارداد ', detail: 'فایل با موفقیت آپلود شد.'});

      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود فایل قرارداد ', detail: response.data});
      }
    });
  }

}
