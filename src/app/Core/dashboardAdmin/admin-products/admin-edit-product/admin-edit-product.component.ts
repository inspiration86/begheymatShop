import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'],
  providers: [MessageService]
})
export class AdminEditProductComponent implements OnInit {


  productId: string;
  product: any;
  // sellers: any[] = [];
  // selectedSeller: any;
  categories: any[] = [];
  subCategories: any[] = [];
  subSubCategories: any[] = [];
  selectedCategory: any;
  selectedSubCategory: any;
  selectedSubSubCategory: any;
  productFeatureOld: any[] = [];
  featureValueOld: any[] = [];
  gallery: any[] = [];
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
              private service: AdminserviceService,
              private route: ActivatedRoute,
              private messageService: MessageService) {
  }


  ngOnInit(): void {
    this.getCategories();
    // this.getSellers();
    this.route.paramMap.subscribe(params =>
      this.productId = params.get('id'));

    this.service.getProductById(this.productId).subscribe((response) => {
      if (response.success) {
        this.product = response.data[0];
        console.log(this.product);
        // this.selectedSeller = this.product.Seller[0];
        this.selectedCategory = this.categories.filter(x => x._id === this.product.categoryID)[0];
        this.subCategories = this.selectedCategory.SubCategory;
        this.selectedSubCategory = this.subCategories.filter(x => x._id === this.product.subCategory)[0];
        this.subSubCategories = this.selectedSubCategory.SubSubCategory;
        this.selectedSubSubCategory = this.subSubCategories.filter(x => x._id === this.product.subSubCategory)[0];

        if (this.product.gallery.length > 0) {
          this.product.gallery.forEach((item) => {
            this.gallery.push(item);
          });
        }

        if (this.product.ProductFeature.length > 0) {
          this.product.ProductFeature.forEach((item) => {
            this.productFeatureOld.push(item['Feature']);
            this.featureValueOld.push(item['FeaturesValue']);
          });
        }

      }
    });
  }

  getCategories(): any {
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getProductInfo(): any{
    this.service.getProductById(this.productId).subscribe((response) => {
      if (response.success) {
        this.product = response.data[0];
        console.log(this.product);
        // this.selectedSeller = this.product.Seller[0];
        this.selectedCategory = this.categories.filter(x => x._id === this.product.categoryID)[0];
        this.subCategories = this.selectedCategory.SubCategory;
        this.selectedSubCategory = this.subCategories.filter(x => x._id === this.product.subCategory)[0];
        this.subSubCategories = this.selectedSubCategory.SubSubCategory;
        this.selectedSubSubCategory = this.subSubCategories.filter(x => x._id === this.product.subSubCategory)[0];

        this.gallery = [];
        if (this.product.gallery.length > 0) {
          this.product.gallery.forEach((item) => {
            this.gallery.push(item);
          });
        }

        this.productFeatureOld = [];
        this.featureValueOld = [];
        if (this.product.ProductFeature.length > 0) {
          this.product.ProductFeature.forEach((item) => {
            this.productFeatureOld.push(item['Feature']);
            this.featureValueOld.push(item['FeaturesValue']);
          });
        }

      }
    });
  }
  // getSellers(): any {
  //   this.service.getAllSellers().subscribe((response) => {
  //     if (response.success === true) {
  //       this.sellers = response.data;
  //     } else {
  //       this.messageService.add({severity: 'error', summary: ' دریافت فروشنده ', detail: response.data});
  //     }
  //   });
  // }

  getSubCategories(e: any) {
    this.subCategories = e.value.SubCategory;
  }

  getSubSubCategories(e: any) {
    this.subSubCategories = e.value.SubSubCategory;
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.product.image.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  onMultipleUpload(event): void {
    const formData = new FormData();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);

    }
    this.service.uploadMultipleFiles(formData).subscribe((response) => {
      if (response.success === true) {
        for (var i = 0; i < response['imagePath'].length; i++) {
          this.gallery.push(response.imagePath[i]);
        }

        // this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  submitForm(): void {

    this.product.categoryID = this.selectedCategory._id;
    this.product.subCategory = this.selectedSubCategory._id;
    this.product.subSubCategory = this.selectedSubSubCategory._id;
    this.product.gallery = this.gallery;

    this.service.editProduct(this.productId, this.product).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' ویرایش محصول ', detail: 'محصول با موفقیت ویرایش شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  deleteGallery(path: any, index: any) {
    let data = {
      path: path
    };
    console.log(path);
    this.service.deleteFile(data).subscribe((response) => {
      if (response['success'] === true) {
        this.gallery.splice(index, 1);
      }
    });
  }


  deleteFeature(item: any, feature) {
    let id = this.product.ProductFeature.find(i => i.featuresID === feature[0]._id)._id;
    this.service.deleteProductFeature(id).subscribe((response) => {
      if (response['success'] === true) {
        this.getProductInfo();
        this.messageService.add({severity: 'success', summary: ' حذف ویژگی ', detail: response['data']});
      }
    });
  }

}
