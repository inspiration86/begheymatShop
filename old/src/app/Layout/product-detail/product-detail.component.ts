import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../../Layout/layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]
})
export class ProductDetailComponent implements OnInit {
  displayBasic = false;
  commentsCount = 0;
  advicesCount = 0;
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    }
  };
  responsiveOptions: any[] = [
    {
      breakpoint: '1600px',
      numVisible: 3
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  images: any[] = [];
  currentIndex: any = -1;
  showFlag: any = false;
  relatedProducts: any[] = [];
  product: any[];
  briefFeature: any[];
  category: any[];
  Inventory: any[];
  InventoryState = true;
  productID: string;
  sellerId: string;
  subCategory: any;
  subsubCategory: any;
  productFeature: any[] = [];
  featureValue: any[] = [];
  form: FormGroup;
  adviceForm: FormGroup;
  errorMessages = {
    commentText: [
      {type: 'required', message: 'نظر را وارد کنید.'},
      {type: 'maxlength', message: 'نظر نمی تواند از 1000 کاراکتر بیشتر باشد.'}
    ]
  };
  adviceErrorMessages = {
    question: [
      {type: 'required', message: 'سوال خود را وارد کنید.'},
      {type: 'maxlength', message: 'سوال نمی تواند از 1000 کاراکتر بیشتر باشد.'}
    ]
  };
  comments: any[] = [];
  advices: any[] = [];

  constructor(private service: LayoutService,
              private formBuilder: FormBuilder,
              private serviceCart: CartService,
              private wishListService: WishListService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private localStorage: LocalStorageService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.spinner.show();
    this.localStorage.getCurrentUser();
    this.route.paramMap.subscribe(params => this.productID = params.get('id'));

    const data = {
      _id: this.productID
    };
    this.productFeature.splice(0, this.productFeature.length);
    this.featureValue.splice(0, this.featureValue.length);
    this.images.splice(0, this.images.length);

    this.service.findProductID(data).subscribe((response) => {
      if (response.success === true) {
        this.spinner.hide();
        this.product = response['data'][0];
        this.sellerId = this.product['sellerID'];

        this.briefFeature = this.product['briefFeature'];
        this.subsubCategory=this.product['subSubCategory'];
        this.subCategory=this.product['subCategory'];
        this.category = response['data'][0]['Category'][0];
        this.Inventory = response['data'][0]['Inventory'][0];
        let PFV = response['data'][0]['ProductFeature'];
        for (let i = 0; i < PFV.length; i++) {
          this.productFeature.push(PFV[i]['Feature']);
          this.featureValue.push(PFV[i]['FeaturesValue']);
        }

        if (this.Inventory['count'] <= 0) {
          this.InventoryState = false;
        }

        let countGallery = this.product['gallery'];
        for (var i = 0; i < countGallery.length; i++) {
          this.images.push({
            image: 'http://194.5.175.25:3005/' + countGallery[i].destination + '/' + countGallery[i].filename,
            thumbnailImageSrc: 'http://194.5.175.25:3005/' + countGallery[i].destination + '/' + countGallery[i].filename,
            previewImageSrc: 'http://194.5.175.25:3005/' + countGallery[i].destination + '/' + countGallery[i].filename,
          });
        }

        this.service.relatedProducts(this.product['subSubCategory']).subscribe((response) => {
          if (response['success'] === true) {
            this.relatedProducts = response['data'];
            this.Inventory = response['data'][0]['Inventory'][0];
          }
        });
      }
    });

    this.service.getProductCommentsCount(this.productID).subscribe((response) => {
      if (response.success === true) {
        this.commentsCount = response.data;
      }
    });

    this.service.getProductAdvicesCount(this.productID).subscribe((response) => {
      if (response.success === true) {
        this.advicesCount = response.data;
      }
    });

    this.form = this.formBuilder.group({
      userID: new FormControl(
        null
      ),
      productID: new FormControl(
        this.productID
      ),
      commentText: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      )
    });

    this.adviceForm = this.formBuilder.group({
      userID: new FormControl(
        null
      ),
      productID: new FormControl(
        this.productID
      ),
      sellerID: new FormControl(
        this.sellerId
      ),
      question: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(1000)
        ]
      )
    });

    this.service.getProductComments(this.productID).subscribe((response) => {
      if (response.success === true) {
        this.comments = response.data;
      }
    });

    this.service.getProductAdvices(this.productID).subscribe((response) => {
      if (response.success === true) {
        this.advices = response.data;
      }
    });
  }

  addCart(product: any): void {
    if (this.InventoryState === true) {
      const list = {
        cartList: product,
        number: 1
      };
      this.displayBasic = true;
      this.serviceCart.addToCart(list);
      this.messageService.add({severity: 'success', summary: ' سبد خرید ', detail: 'کالا به سبد خرید اضافه شد'});

    } else {
      this.messageService.add({severity: 'error', summary: ' موجودی کالا  ', detail: 'کالا موجود نیست'});
    }
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail/' + id]);
    this.ngOnInit();
  }

  goCart(): void {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/home/cart']);
  }

  addComment(): void {

    if (this.localStorage.userJson !== null) {
      if (this.localStorage.userJson.id !== null) {
        this.form.controls.userID.setValue(this.localStorage.userJson.id);

        this.service.addProductComment(this.form.value).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' ثبت نظر', detail: response.data});
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت نظر ', detail: response.data});

          }
        });
      }
      else {
        this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
      }
    }
    else {
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }

  }

  addAdvice(): void {

    if (this.localStorage.userJson !== null) {
      if (this.localStorage.userJson.id !== null) {
        this.adviceForm.controls.userID.setValue(this.localStorage.userJson.id);
        this.adviceForm.controls.sellerID.setValue(this.sellerId);

        this.service.addProductAdvice(this.adviceForm.value).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' ثبت سوال', detail: response.data});
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت سوال ', detail: response.data});

          }
        });
      }
      else {
        this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
      }
    }
    else {
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }

  }

  addToWishList(id: any): void {

    if (this.localStorage.userJson.id !== undefined) {

      const data = {
        userID: this.localStorage.userJson.id,
        productID: id
      };
      this.service.addWishList(data).subscribe((response) => {
        if (response.success === true) {
          this.wishListService.getWishListFromApi(this.localStorage.userJson.id);
          this.messageService.add({severity: 'success', summary: ' ثبت علاقه مندی ', detail: response.data});
        } else {
          this.messageService.add({severity: 'error', summary: ' ثبت علاقه مندی ', detail: response.data});
        }
      });
    } else {
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }
  }


  showLightbox(index) {
    console.log(this.images);
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  goProductDetail(id: any): any {
    this.router.navigateByUrl('/home/detail/' + id );
  }
}
