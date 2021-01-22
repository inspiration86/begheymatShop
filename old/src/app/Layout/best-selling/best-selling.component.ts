import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.css'],
  providers: [MessageService]

})
export class BestSellingComponent implements OnInit {
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
        items: 2
      },
      600: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    }
  };
  bestsellingProduct: any[] = [];
  displayBasic: boolean;
  isLogged: boolean;

  constructor(private service: LayoutService,
              private serviceCart: CartService,
              private wishListService: WishListService,
              private messageService: MessageService,
              private spinner: NgxSpinnerService,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    this.spinner.show();
    this.service.Bestselling().subscribe((response) => {
      if (response['success'] === true) {
        this.bestsellingProduct = response['data'];
        this.spinner.hide();
      }

    });


  }

  addToWishList(id: any): void {
    if (this.isLogged) {
      if (this.localStorage.userJson.id !== null) {
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
    else{
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }
  }

  addCart(product: any, count: any) {
    if (count <= 0) {
      alert('موجود نمی باشد');
    } else {
      let list = {
        cartList: product,
        number: 1
      };

      this.serviceCart.addToCart(list);
      this.displayBasic = true;

    }
  }
}
