import {Router} from '@angular/router';
import {OverlayService} from './../../../../overlay.service';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AdminserviceService} from './../../adminservice.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css'],
  providers: [
    MessageService
  ]
})
export class AdminAddProductComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    sellerID: [
      {type: 'required', message: 'فروشنده را انتخاب کنید.'}
    ],
    categoryID: [
      {type: 'required', message: 'دسته اول را انتخاب کنید.'}
    ],
    subCategory: [
      {type: 'required', message: 'دسته دوم را انتخاب کنید.'}
    ],
    subSubCategory: [
      {type: 'required', message: 'دسته سوم را انتخاب کنید.'}
    ],
    offer: [
      {type: 'required', message: 'تخفیف را انتخاب کنید.'}
    ],
    topText: [
      {type: 'required', message: 'متن بالای محصول را وارد کنید.'},
      {type: 'maxlength', message: 'متن بالای محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    price: [
      {type: 'required', message: 'قیمت محصول را وارد کنید.'}
    ],
    count: [
      {type: 'required', message: 'تعداد محصول را وارد کنید.'}
    ],
    detail: [
      {type: 'required', message: 'جزئیات محصول را وارد کنید.'}
    ],
    help: [
      {type: 'required', message: 'راهنما محصول را وارد کنید.'}
    ],
    briefFeature: [
      {type: 'required', message: 'خلاصه ویژگی های محصول را وارد کنید.'}
    ],
    image: [
      {type: 'required', message: 'تصویر محصول را بارگذاری کنید.'}
    ],
    freeSend: [
      {type: 'required', message: 'ارسال رایگان را انتخاب کنید.'}
    ],
    weight: [
      {type: 'required', message: 'وزن محصول را انتخاب کنید.'}
    ],
  };
  categories: any[] = [];
  sellers: any[] = [];
  subCategory: any[] = [];
  subSubCategory: any[] = [];
  features: any[] = [];
  featuresID: any;
  featuresValueID: any;
  featuresTitle: any;
  values: any[] = [];
  showSelectedFeatures: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              private messageService: MessageService,
              public overlayService: OverlayService) {
  }

  ngOnInit(): void {
    this.createform();
    this.getCategories();
    this.getSellers();
    this.getFeatures();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      sellerID: new FormControl(
        null
      ),
      title: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      categoryID: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      subCategory: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      subSubCategory: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      count: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      price: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      topText: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      offer: new FormControl(
        false,
        [
          Validators.required
        ]
      ),
      offerPercent: new FormControl(
        0
      ),
      offerText: new FormControl(
        null
      ),
      detail: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      help: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      briefFeature: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      gallery: new FormControl(
        null
      ),
      freeSend: new FormControl(
        false,
        [
          Validators.required
        ]
      ),
      weight: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
    });
  }

  imageUploader(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      this.overlayService.showOverlay = false;
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر محصول ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  onMultipleUpload(event): void {
    this.overlayService.showOverlay = true;
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.uploadMultipleFiles(formData).subscribe((response) => {
      console.log(response);
      if (response.success === true) {
        this.overlayService.showOverlay = false;
        this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر محصول ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  getSellers(): any {
    this.service.getAllSellers().subscribe((response) => {
      if (response.success === true) {
        this.sellers = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت فروشنده ', detail: response.data});
      }
    });
  }

  getCategories(): any {
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ', detail: response.data});
      }
    });
  }

  getSubCategory(e: any) {
    let category = e.value;
    this.subCategory = category.SubCategory;
  }

  onSubSubCategory(e: any) {
    let category = e.value;
    this.subSubCategory = category.SubSubCategory;
  }

  getFeatures(): any {
    this.service.getAllFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  submitForm(): void {

    const category = this.form.controls.categoryID.value;
    const subcategory = this.form.controls.subCategory.value;
    const subSubCategory = this.form.controls.subSubCategory.value;
    const seller = this.form.controls.sellerID.value;

    this.form.controls.sellerID.setValue(seller._id);
    this.form.controls.categoryID.setValue(category._id);
    this.form.controls.subCategory.setValue(subcategory._id);
    this.form.controls.subSubCategory.setValue(subSubCategory._id);


    this.service.addProduct(this.form.value).subscribe((response) => {
      this.overlayService.showOverlay = true;
      if (response.success === true) {

        const value = {
          productID: response.result._id,
          productFeature: this.showSelectedFeatures,
        };

        this.service.addProductFeature(value).subscribe((res) => {
          if (res.success === true) {
            console.log(res.success);
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت ویژگی محصول ', detail: res.data});
          }
        });
        this.overlayService.showOverlay = false;
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  getFeatureValues(event): void {
    this.values = event.value['FeaturesValue'];
    this.featuresID = event.value['_id'];
    this.featuresTitle = event.value['titleFarsi'];
  }

  addSelectedValues(event: any): void {
    const parent = this.values.find(x => x.value === event.value)._id;
    this.showSelectedFeatures.push(
      {
        featuresID: this.featuresID,
        title: this.featuresTitle,
        valueID: parent,
        value: event.value
      }
    );
  }

  deleteFeature(item: any) {
    this.showSelectedFeatures.splice(item, 1);
  }

}
