import {Component, OnInit} from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {LayoutService} from '../layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [MessageService]

})
export class AllProductsComponent implements OnInit {

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
  Product: any[] = [];
  displayBasic: boolean;
  displayNotProduct: boolean;
  isLogged: boolean;

  constructor(private service: LayoutService,
              private serviceCart: CartService,
              private wishListService: WishListService,
              private router: Router,
              private messageService: MessageService,
              private localStorage: LocalStorageService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    // this.spinner.show();
    this.service.allProduct().subscribe((response) => {
      if (response.success === true){
        this.Product = response.data;

        console.log(this.Product);
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

  addCart(product: any, count: any): void {
    if (count <= 0) {
      this.displayNotProduct = true;
    } else {
      const list = {
        cartList: product,
        number: 1
      };
      this.serviceCart.addToCart(list);
      this.displayBasic = true;
    }
  }

  goCart(): void {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/home/cart']);
  }

}
