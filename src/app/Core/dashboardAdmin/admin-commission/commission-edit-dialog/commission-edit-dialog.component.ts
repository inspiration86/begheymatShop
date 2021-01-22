import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-commission-edit-dialog',
  templateUrl: './commission-edit-dialog.component.html',
  styleUrls: ['./commission-edit-dialog.component.css'],
  providers: [MessageService]
})
export class CommissionEditDialogComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];

  selectedCat: any = null;
  selectedSub: any = null;
  selectedSubSub: any = null;
  subCategoryParent: any = null;
  commission: any;

  public form: FormGroup;
  errorMessages = {
    percent: [
      {type: 'required', message: 'درصد دسته بندی را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.commission = this.config.data.commission;
    this.categories = this.config.data.categories;

    if (this.commission.Category.length > 0) {
      this.selectedCat = this.categories.find(x => x._id === this.commission.categoryID);
      this.subCategories = this.selectedCat.SubCategory;
    }
    if (this.commission.SubCategory.length > 0) {
      this.selectedCat = this.categories.find(x => x._id === this.commission.SubCategory[0].categoryID);
      this.subCategories = this.categories.find(x => x._id === this.commission.SubCategory[0].categoryID).SubCategory;
      this.selectedSub = this.subCategories.find(x => x._id === this.commission.categoryID);
      this.subSubCategories = this.selectedSub.SubSubCategory;
    }
    if (this.commission.SubSubCategory.length > 0) {

      this.categories.forEach((cat)=>{
        cat.SubCategory.forEach((sub)=>{
          if(sub._id === this.commission.SubSubCategory[0].SubCategoryID){
            return (this.subCategoryParent = cat);
          }
        });
      });

      this.selectedCat = this.categories.find(x => x._id === this.subCategoryParent._id);
      this.subCategories = this.categories.find(x => x._id === this.selectedCat._id).SubCategory;
      this.selectedSub = this.subCategories.find(x => x._id === this.commission.SubSubCategory[0].SubCategoryID);
      this.subSubCategories = this.subCategories.find(x => x._id === this.commission.SubSubCategory[0].SubCategoryID).SubSubCategory;
      this.selectedSubSub = this.subSubCategories.find(x => x._id === this.commission.categoryID);
    }

    this.form = this.formBuilder.group({
      catID: new FormControl(
        this.selectedCat
      ),
      subID: new FormControl(
        this.selectedSub
      ),
      subSubID: new FormControl(
        this.selectedSubSub
      ),
      categoryID: new FormControl(
        null
      ),
      percent: new FormControl(
        this.commission.percent,
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
    } else if (this.form.controls.subID.value !== null) {
      category = this.form.controls.subID.value;
    } else if (this.form.controls.catID.value !== null) {
      category = this.form.controls.catID.value;
    }

    if (category !== null) {
      this.form.controls.categoryID.setValue(category._id);
      this.service.editCommission(this.commission._id, this.form.value).subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
        }
      });
    } else {
      this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: 'لطفا دسته بندی را مشخص کنید'});
    }

  }
}
