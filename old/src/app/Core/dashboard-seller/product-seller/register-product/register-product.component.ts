import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {OverlayService} from '../../../../overlay.service';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css'],
  providers: [
    MessageService
  ]
})
export class RegisterProductComponent implements OnInit {

  public form: FormGroup;
  categories: any[] = [];
  subCategory: any[] = [];
  subSubCategory: any[] = [];
  features: any[] = [];
  selectedFeature: any = null;

  values: any[] = [];
  selectedValues: any[] = [];
  showSelectedFeatures: any[] = [];
  finalSelectedValues: any[] = [];

  gifts: any[] = [];
  selectedGifts: any[] = [];
  showSelectedGifts: any[] = [];
  finalSelectedGifts: any[] = [];

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

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              public overlayService: OverlayService,
              private localstorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.localstorage.getCurrentUser();
    this.getCategories();
    this.getFeatures();
    this.getGifts();
    this.createform();
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

        const featureValue: any[] = [];

        this.finalSelectedValues.forEach(item => {

          featureValue.push({
            'featuresID': item.featuresID,
            'valueID': item.id
          });

        });
        const value = {
          productID: response.result._id,
          productFeature: featureValue,
        };
        this.sellerService.addProductFeature(value).subscribe((res) => {
          if (res.success === true) {
            console.log(res.success);
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت ویژگی محصول ', detail: res.data});
          }
        });

        this.finalSelectedGifts.forEach(item => {
          const gift = {
            productID: response.result._id,
            giftID: item._id,
          };

          this.sellerService.addProductGift(gift).subscribe((res) => {
            if (res.success === true) {
              console.log(res.success);
            } else {
              this.messageService.add({severity: 'error', summary: ' ثبت نوع هدیه ', detail: res.data});
            }
          });
        });

        this.messageService.add({severity: 'success', summary: ' ثبت محصول ', detail: 'محصول با موفقیت ثبت شد.'});
        this.clearForm();
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
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

  getSubCategory(e: any) {
    let category = e.value;
    this.subCategory = category.SubCategory;
  }

  onSubSubCategory(e: any) {
    let category = e.value;
    this.subSubCategory = category.SubSubCategory;
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

  getFeatures(): any {
    this.sellerService.getFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getGifts(): any {
    this.sellerService.getGifts().subscribe((response) => {
      if (response.success === true) {
        this.gifts = response.data;
        console.log(this.gifts);
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getFeatureValues(event): void {
    this.values = this.features.find(x => x.id === event.value._id).FeaturesValue;
  }

  addSelectedValues(event: any): void {
    if (event.value !== null) {
      this.finalSelectedValues = [];
      this.finalSelectedValues.push(...event.value);

      this.showSelectedFeatures = [];
      event.value.forEach(item => {
        const parent = this.features.find(x => x.id === item.featuresID).titleFarsi;
        this.showSelectedFeatures.push(
          {
            featureId: item.featureID,
            title: parent,
            valueId: item.id,
            value: item.value
          }
        );
      });
    }
  }

  addSelectedGifts(event: any): void {
    if (event.value !== null) {
      this.finalSelectedGifts = [];
      this.finalSelectedGifts.push(...event.value);

      this.showSelectedGifts = [];
      event.value.forEach(item => {

        this.showSelectedGifts.push(
          {
            giftId: item._id,
            giftTitle: item.giftTitle
          }
        );
      });
    }
  }

  clearForm(): void {
    // this.form.reset();
  }

}
