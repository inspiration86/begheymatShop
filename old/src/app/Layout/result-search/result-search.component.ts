import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutService} from '../layout.service';
import {CartService} from '../../serviceCart/cart.service';
import {MessageService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {SearchService} from '../../search.service';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css'],
  providers: [MessageService]
})
export class ResultSearchComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  categories: any[] = [];
  displaySort = false;
  displaySortTop = true;
  displayFilter = false;
  valueDynamic = 500000;
  isLogged: boolean;
  highValueDynamic = 50000000;
  Products: any[];
  FilteredProducts: any[];
  product: any[];
  sortId = 1;
  displayBasic: boolean;
  options: Options = {
    floor: 500000,
    ceil: 50000000,
    step: 500000
  };
  countOfProduct = 7;
  priceList: number[] = [];
  resultSearch: boolean;
  offer = false;
  freeSend: any = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: LayoutService,
              private serviceCart: CartService,
              private wishListService: WishListService,
              private messageService: MessageService,
              private localStorage: LocalStorageService,
              private spinner: NgxSpinnerService,
              public servicSearch: SearchService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {

    this.isLogged = this.localStorage.getCurrentUser();
    if (this.servicSearch.resultSearchBox.length > 0) {
      this.resultSearch = true;
      this.Products = this.servicSearch.resultSearchBox;
      // this.spinner.show();
      this.getCategories();
      this.FilteredProducts = this.Products;
      this.Products.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });
      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 500000
      };
      this.countOfProduct = this.servicSearch.resultSearchBox.length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
    } else {
      this.resultSearch = false;
    }
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }

  getCategories(): any {
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.spinner.hide();
        this.categories = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ', detail: response.data});
      }
    });
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }

  sort(sortId: any): void {
    this.sortId = sortId;
    var array = this.servicSearch.resultSearchBox;

    switch (sortId) {
      case 1:
        array.sort((a, b) => b.countSell - a.countSell);

        break;
      case 2:

        array.sort((a, b) => a.price - b.price);

        break;
      case 3:
        array.sort((a, b) => b.price - a.price);

        break;
      case 4:
        array.sort((a, b) => a.updatedAt - b.updatedAt);
        break;
    }
    this.service.searchProduct(array).subscribe((response) => {
      if (response.success === true) {
        this.FilteredProducts = array;

        this.FilteredProducts.forEach(item => {
          this.priceList.push(Number.parseInt(item.price));
        });

        this.valueDynamic = Math.min(...this.priceList);
        this.highValueDynamic = Math.max(...this.priceList);

        this.options = {
          floor: this.valueDynamic,
          ceil: this.highValueDynamic,
          step: 500000
        };
        this.countOfProduct = array.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      }
    });

    this.displaySort = false;
  }

  openFilter(): void {
    this.displayFilter = true;
  }

  openSort(): void {
    this.displaySort = true;
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
    } else {
      this.messageService.add({severity: 'error', summary: ' کاربر نا معتبر ', detail: 'لطفا ابتدا وارد سایت شوید.'});
    }
  }

  addCart(products: any): void {
    const list = {
      cartList: products,
      number: 1
    };
    this.serviceCart.addToCart(list);
    this.displayBasic = true;
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail/' + id]);
  }

  goCart(): void {
    this.displayBasic = !this.displayBasic;
    this.router.navigate(['/home/cart']);
  }

  filterByCategory(catId: any, subId: any, subSubId: any): void {

    const filteredProducts = [];

    if (subSubId !== 0){
      this.Products.forEach(item => {
        if (item.subSubCategory === subSubId) {
          filteredProducts.push(item);
        }
      });
    }
    else if (subId !== 0){
      this.Products.forEach(item => {
        if (item.subCategory === subId) {
          filteredProducts.push(item);
        }
      });
    }
    else if (catId !== 0){
      this.Products.forEach(item => {
        if (item.categoryID === catId) {
          filteredProducts.push(item);
        }
      });
    }

    this.FilteredProducts = [];
    this.FilteredProducts = filteredProducts;
    if (this.FilteredProducts.length > 0) {

      this.FilteredProducts.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });
      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
      this.pageOfItems = undefined;
      this.resultSearch = true;
    } else {
      this.resultSearch = false;
      this.options = {
        floor: 500000,
        ceil: 50000000,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = [];
      this.pageOfItems = undefined;
    }
  }

  filterByPrice(): void {

    const filterdProducts = [];

    this.FilteredProducts.forEach(item => {
      if (Number.parseInt(item.price) >= this.valueDynamic &&
        Number.parseInt(item.price) <= this.highValueDynamic) {
        filterdProducts.push(item);
      }
    });

    this.FilteredProducts = [];
    this.FilteredProducts = filterdProducts;

    if (this.FilteredProducts.length > 0) {
      this.FilteredProducts.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });
      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
      this.pageOfItems = undefined;
      this.resultSearch = true;
    } else {
      this.resultSearch = false;
      this.options = {
        floor: 500000,
        ceil: 50000000,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = [];
      this.pageOfItems = undefined;
    }
  }

  hasOffer(): void {
    if (this.offer === true) {

      const filterdProducts = [];
      this.FilteredProducts.forEach(item => {
        if (item.offer === true) {
          filterdProducts.push(item);
        }
      });
      this.FilteredProducts = [];
      this.FilteredProducts = filterdProducts;
      if (this.FilteredProducts.length > 0) {
        this.Products.forEach(item => {
          this.priceList.push(Number.parseInt(item.price));
        });
        this.valueDynamic = Math.min(...this.priceList);
        this.highValueDynamic = Math.max(...this.priceList);

        this.options = {
          floor: this.valueDynamic,
          ceil: this.highValueDynamic,
          step: 500000
        };
        this.countOfProduct = this.servicSearch.resultSearchBox.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      } else {
        this.resultSearch = false;
        this.options = {
          floor: 500000,
          ceil: 50000000,
          step: 500000
        };
        this.countOfProduct = this.FilteredProducts.length;
        this.items = [];
        this.pageOfItems = undefined;
        this.resultSearch = true;
      }
    } else {
      if (this.Products.length > 0) {
        this.resultSearch = true;
        this.getCategories();
        this.FilteredProducts = this.Products;
        this.Products.forEach(item => {
          this.priceList.push(Number.parseInt(item.price));
        });
        this.valueDynamic = Math.min(...this.priceList);
        this.highValueDynamic = Math.max(...this.priceList);
        this.options = {
          floor: this.valueDynamic,
          ceil: this.highValueDynamic,
          step: 500000
        };
        this.countOfProduct = this.servicSearch.resultSearchBox.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      } else {
        this.resultSearch = false;
      }
    }
  }

  hasFreeSend(): void {
    if (this.freeSend === true) {

      const filterdProducts = [];
      this.FilteredProducts.forEach(item => {
        if (item.freeSend === true) {
          filterdProducts.push(item);
        }
      });
      this.FilteredProducts = [];
      this.FilteredProducts = filterdProducts;
      if (this.FilteredProducts.length > 0) {
        this.FilteredProducts.forEach(item => {
          this.priceList.push(Number.parseInt(item.price));
        });
        this.valueDynamic = Math.min(...this.priceList);
        this.highValueDynamic = Math.max(...this.priceList);

        this.options = {
          floor: this.valueDynamic,
          ceil: this.highValueDynamic,
          step: 500000
        };
        this.countOfProduct = this.Products.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      } else {
        this.resultSearch = false;
        this.options = {
          floor: 500000,
          ceil: 50000000,
          step: 500000
        };
        this.countOfProduct = this.product.length;
        this.items = [];
        this.pageOfItems = undefined;
        this.resultSearch = true;
      }
    } else {
      if (this.Products.length > 0) {
        this.resultSearch = true;
        this.getCategories();
        this.FilteredProducts = this.Products;
        this.FilteredProducts.forEach(item => {
          this.priceList.push(Number.parseInt(item.price));
        });
        this.valueDynamic = Math.min(...this.priceList);
        this.highValueDynamic = Math.max(...this.priceList);
        this.options = {
          floor: this.valueDynamic,
          ceil: this.highValueDynamic,
          step: 500000
        };
        this.countOfProduct = this.Products.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      } else {
        this.resultSearch = false;
      }
    }

  }

  clearCategory(): void{
    this.FilteredProducts = [];
    this.FilteredProducts = this.Products;
    if (this.FilteredProducts.length > 0) {

      this.FilteredProducts.forEach(item => {
        this.priceList.push(Number.parseInt(item.price));
      });
      this.valueDynamic = Math.min(...this.priceList);
      this.highValueDynamic = Math.max(...this.priceList);

      this.options = {
        floor: this.valueDynamic,
        ceil: this.highValueDynamic,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
      this.pageOfItems = undefined;
      this.resultSearch = true;
    } else {
      this.resultSearch = false;
      this.options = {
        floor: 500000,
        ceil: 50000000,
        step: 500000
      };
      this.countOfProduct = this.FilteredProducts.length;
      this.items = [];
      this.pageOfItems = undefined;
    }
  }
}
