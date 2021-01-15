import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerService} from '../../seller.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';

interface productFeature1 {
  productID: string,
  sellerID: string,
  valueID: string
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [
    MessageService
  ]
})
export class EditProductComponent implements OnInit {

  public form: FormGroup;
  productId: string;
  categories: any[] = [];
  subCategory: any[] = [];
  subSubCategory: any[] = [];
  selectedCategory: any;
  features: any[] = [];
  values: any[] = [];
  featuresID: any;
  featuresValueID: any;
  featuresTitle: any;
  selectedValues: any[] = [];
  showSelectedFeatures: any[] = [];
  finalSelectedValues: any[] = [];
  ProductFeatureOld: any[];
  productFeatureOld: any[] = [];
  featureValueOld: any[] = [];
  ProductFeatureMain: any[] = [];
  product: any;
  categoryID;
  subCategoryID;
  subSubCategoryID;
  image;
  gallery:any[]=[];

  constructor(private formBuilder: FormBuilder,
              private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getFeatures();
    this.route.paramMap.subscribe(params =>
      this.productId = params.get('id'));
    this.productFeatureOld.splice(0, this.productFeatureOld.length);
    this.featureValueOld.splice(0, this.featureValueOld.length);
    this.loadProductInfo();
    this.form = this.formBuilder.group({
      title: new FormControl('',

        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      categoryID: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      subCategory: new FormControl('',
        [
          Validators.required
        ]
      ),
      subSubCategory: new FormControl('',
        [
          Validators.required
        ]
      ),
      count: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      price: new FormControl('',
        [
          Validators.required
        ]
      ),
      topText: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      offer: new FormControl('',
        [
          Validators.required
        ]
      ),
      offerPercent: new FormControl(
        ''
      ),
      offerText: new FormControl(
        ''
      ),
      detail: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      help: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      briefFeature: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      gallery: new FormControl(
        '',
      ),
      freeSend: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      weight: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
    });
  }

  submitForm(): void {

    this.form.controls.categoryID.setValue(this.categoryID);
    this.form.controls.subCategory.setValue(this.subCategoryID);
    this.form.controls.subSubCategory.setValue(this.subSubCategoryID);
    // this.form.controls.image.setValue(this.image);
    this.form.controls.gallery.setValue(this.gallery);
    const count = Number.parseInt(this.form.controls.count.value);
    this.form.controls.count.setValue(count);
    console.log(this.form.value)
    this.sellerService.editProduct(this.productId, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' ویرایش محصول ', detail: 'محصول با موفقیت ویرایش شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت محصول ', detail: response.data});
      }
    });
  }

  getSubCategory(e: any) {

    let category = e.value;
    this.categoryID = category._id;
    this.subCategory = category.SubCategory;
  }

  onSubSubCategory(e: any) {
    let category = e.value;
    this.subCategoryID = category._id;
    this.subSubCategory = category.SubSubCategory;
  }

  onSubSubSubCategory(e: any) {
    let category = e.value;
    this.subSubCategoryID = category._id;

  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.sellerService.uploadFile(formData).subscribe((response) => {
      console.log(response.success);
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
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
    this.sellerService.uploadFiles(formData).subscribe((response) => {
      if (response.success === true) {
        for(var i=0;i<response['imagePath'].length;i++){
          this.gallery.push(response.imagePath[i])
        }

        // this.form.controls.gallery.setValue(response.imagePath);
        this.messageService.add({severity: 'success', summary: ' آپلود تصویر محصول ', detail: 'تصویر با موفقیت آپلود شد.'});
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  deleteGallery( path: any,index:any) {
    let data = {
      path: path
    };
    console.log(path);
    this.sellerService.deleteImage(data).subscribe((response) => {

      if(response['success']===true){
        this.gallery.splice(index,1);

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
    let data = {
      productID: this.productId,
      featuresID: this.featuresID,
      valueID: parent,
    };
    this.sellerService.registerProductFeatureSingle(data).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'error', summary: ' ثبت ویژگی ', detail: response['data']});
        this.loadProductInfo();
      }

    });

  }

  loadProductInfo() {
    this.productFeatureOld.splice(0, this.productFeatureOld.length);
    this.featureValueOld.splice(0, this.featureValueOld.length);
    this.sellerService.getProductById(this.productId).subscribe((response) => {
      if (response.success) {
        this.product = response.data[0];
        this.categoryID=this.product.categoryID;
        this.subCategoryID=this.product.subCategory;
        this.subSubCategoryID=this.product.subSubCategory;
        // this.image=this.product.image;

        for(let i=0; i<this.product['gallery'].length; i++){
          this.gallery.push(this.product['gallery'][i]);
        }
        this.ProductFeatureOld = response.data[0].ProductFeature;
        this.ProductFeatureMain = response.data[0].ProductFeature;
        for (let i = 0; i < this.ProductFeatureOld.length; i++) {
          this.productFeatureOld.push(this.ProductFeatureOld[i]['Feature']);
          this.featureValueOld.push(this.ProductFeatureOld[i]['FeaturesValue']);
        }
        this.sellerService.getCategories().subscribe((response) => {
          if (response.success === true) {
            this.categories = response.data;
          } else {
            this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
          }
        });

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

  deleteFeature(item: any, feature) {
    let id = this.ProductFeatureMain.find(i => i.featuresID === feature[0]._id)._id;
    this.sellerService.deleteProductFeature(id).subscribe((response) => {
      if (response['success'] === true) {
        this.loadProductInfo();
        this.messageService.add({severity: 'error', summary: ' حذف ویژگی ', detail: response['data']});
      }
    });
  }
}
