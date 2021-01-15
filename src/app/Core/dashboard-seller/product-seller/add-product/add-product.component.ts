import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {OverlayService} from '../../../../overlay.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [
    MessageService
  ]
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
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
  subCategory: any[] = [];
  subSubCategory: any[] = [];
  features: any[] = [];
  featuresID:any;
  featuresValueID:any;
  featuresTitle:any;
  values: any[] = [];
  showSelectedFeatures: any[] = [];
  constructor(private formBuilder: FormBuilder,
              private localstorage: LocalStorageService,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              public overlayService: OverlayService) {
  }

  ngOnInit(): void {
    this.localstorage.getCurrentUser();
    this.createform();
    this.getCategories();
    this.getFeatures();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      sellerID: new FormControl(
        this.localstorage.userJson['_id']
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
    this.sellerService.uploadFile(formData).subscribe((response) => {
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
    this.sellerService.uploadFiles(formData).subscribe((response) => {
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

  getSubCategory(e: any) {
    let category = e.value;
    this.subCategory = category.SubCategory;
  }

  getCategories(): any {
    this.sellerService.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ', detail: response.data});
      }
    });
  }

  onSubSubCategory(e: any) {
    let category = e.value;
    this.subSubCategory = category.SubSubCategory;
  }

  getFeatures(): any {
    this.sellerService.getFeatures().subscribe((response) => {
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
    this.form.controls.sellerID.setValue(this.localstorage.userJson['_id']);
    this.form.controls.categoryID.setValue(category._id);
    this.form.controls.subCategory.setValue(subcategory._id);
    this.form.controls.subSubCategory.setValue(subSubCategory._id);
    console.log(this.form.value);
    this.sellerService.addProduct(this.form.value).subscribe((response) => {

      if (response.success === true) {

        const value = {
          productID: response.result._id,
          productFeature: this.showSelectedFeatures,
        };
        console.log(value);
        this.sellerService.addProductFeature(value).subscribe((res) => {
         console.log(res)
          if (res.success === true) {
            console.log(res.success);
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت ویژگی محصول ', detail: res.data});
          }
        });

      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  getFeatureValues(event): void {
    this.values = event.value['FeaturesValue'];
    this.featuresID=event.value['_id'];
    this.featuresTitle=event.value['titleFarsi']
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
  deleteFeature(item:any){
    this.showSelectedFeatures.splice(item,1)
  }
}
