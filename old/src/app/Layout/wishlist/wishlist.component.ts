import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../layout.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {CartService} from '../../serviceCart/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WishListService} from '../../SharedComponent/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [MessageService]
})
export class WishlistComponent implements OnInit {

  wishListId: any[] = [];
  wishList: any[] = [];
  displayBasic: boolean;
  isLogged: boolean;

  constructor(private service: LayoutService,
              private spinner: NgxSpinnerService,
              private messageService: MessageService,
              private serviceCart: CartService,
              private wishListService: WishListService,
              private router: Router,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    this.getWishList();
  }

  getWishList(): void {
    if (this.isLogged) {
      if (this.localStorage.userJson.id !== null) {
        this.spinner.show();
        const data = {
          userID: this.localStorage.userJson.id
        };
        this.service.getWishList(data).subscribe((response) => {
          if (response.success === true) {
            this.wishListId = response.data;

            this.wishListId.forEach(item => {
              const id = {
                _id: item.productID
              };
              this.service.findProductID(id).subscribe((res) => {
                if (res.success === true) {
                  this.wishList.push(...res.data);
                }
              });
            });
          }
          this.spinner.hide();
        });
      }
    }
  }

  delete(id: any): any {
    const wishId = this.wishListId.find(x => x.productID === id)._id;

    this.service.deleteWishList(wishId).subscribe((response) => {
      if (response.success === true) {
        this.wishListId = [];
        this.wishList = [];
        this.getWishList();
        this.wishListService.getWishListFromApi(this.localStorage.userJson.id);
      } else {
        this.messageService.add({severity: 'error', summary: ' حذف علاقه مندی ', detail: response.data});
      }
    });
  }

  addToCart(product: any, count: any): void {
    if (count !== undefined) {
      if (count <= 0) {
        this.messageService.add({severity: 'error', summary: ' خطا ', detail: 'محصول ناموجود است.'});
      } else {
        const list = {
          cartList: product,
          number: 1
        };
        this.serviceCart.addToCart(list);
        this.displayBasic = true;
      }
    } else {
      this.messageService.add({severity: 'error', summary: ' خطا ', detail: 'محصول ناموجود است.'});
    }
  }
}
