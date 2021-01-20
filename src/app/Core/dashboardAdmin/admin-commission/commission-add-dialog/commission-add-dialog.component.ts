import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-commission-add-dialog',
  templateUrl: './commission-add-dialog.component.html',
  styleUrls: ['./commission-add-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class CommissionAddDialogComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];

  public form: FormGroup;
  errorMessages = {
    percent: [
      {type: 'required', message: 'درصد دسته بندی را وارد کنید.'}
    ],
    catID: [
      {type: 'required', message: 'دسته بندی را انتخاب کنید'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.categories = this.config.data.categories;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      catID: new FormControl(
        null
      ),
      subID: new FormControl(
        null
      ),
      subSubID: new FormControl(
        null
      ),
      categoryID: new FormControl(
        null
      ),
      percent: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });
  }

  getSubCategory(e: any) {
    let category = e.value;
    this.subCategories = category.SubCategory;
  }

  getSubSubCategory(e: any) {
    let category = e.value;
    this.subSubCategories = category.SubSubCategory;
  }

  submitForm(): void {
    let category = null;
    if (this.form.controls.subSubID.value !== null) {
      category = this.form.controls.subSubID.value;
    }
    else if (this.form.controls.subID.value !== null) {
      category = this.form.controls.subID.value;
    }
    else if (this.form.controls.catID.value !== null) {
      category = this.form.controls.catID.value;
    }

    if(category !== null){
      this.form.controls.categoryID.setValue(category._id);
      this.service.addCommission(this.form.value).subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
        }
      });
    } else{
      this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: 'لطفا دسته بندی را مشخص کنید'});
    }
  }

}
