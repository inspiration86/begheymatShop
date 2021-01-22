import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {LayoutService} from '../layout.service';
import {MenuItem, MessageService} from 'primeng/api';
import {CartService} from '../../serviceCart/cart.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import {WishListService} from '../../SharedComponent/wish-list.service';
import {SearchService} from '../../search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]

})
export class ProductsComponent implements OnInit {
  items = [];
  pageOfItems: Array<any>;
  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  currentCategory: any;
  currentSubCategory: any;
  currentSubSubCategory: any;
  displaySort = false;
  displayFilter = false;
  valueDynamic = 500000;
  highValueDynamic = 50000000;
  FilteredProducts: any[] = [];
  displayBasic: boolean;
  options: Options = {
    floor: 500000,
    ceil: 50000000,
    step: 500000
  };
  countOfProduct = 5;
  priceList: number[] = [];
  categoryId: any;
  subCategoryId: any;
  subSubCategoryId: any;
  isLogged: boolean;
  sortId = 1;
  offer = false;
  freeSend = false;
  resultSearch = false;

  constructor(private router: Router,
              private service: LayoutService,
              private serviceCart: CartService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private wishListService: WishListService,
              private localStorage: LocalStorageService,
              private servicSearch: SearchService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.spinner.show();

    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('cat');
      this.subCategoryId = params.get('sub');
      this.subSubCategoryId = params.get('sub2');
    });

    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.spinner.hide();
        this.categories = response.data;

        if (this.categoryId !== 0) {
          this.currentCategory = this.categories.find(x => x._id === this.categoryId);
        }
        if (this.subCategoryId !== 0) {
          const cat = this.categories.find(x => x._id === this.categoryId);
          this.currentSubCategory = cat.SubCategory.find(x => x._id === this.subCategoryId);
        }
        if (this.subSubCategoryId !== 0) {
          const cat = this.categories.find(x => x._id === this.categoryId);
          const sub = cat.SubCategory.find(x => x._id === this.subCategoryId);
          this.currentSubSubCategory = sub.SubSubCategory.find(x => x._id === this.subSubCategoryId);
        }
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت دسته بندی ', detail: response.data});
      }
    });

    if (this.servicSearch.resultSearchBox !== undefined) {

      if (this.servicSearch.resultSearchBox.length > 0) {
        this.resultSearch = true;
        this.FilteredProducts = this.servicSearch.resultSearchBox;

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
      }

    } else {
      let data;
      if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
        data = {
          countSell: -1,
          offer: this.offer,
          freeSend: this.freeSend
        };
      } else {
        if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
          data = {
            categoryID: this.categoryId,
            subCategory: this.subCategoryId,
            subSubCategory: this.subSubCategoryId,
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
          data = {
            categoryID: this.categoryId,
            subCategory: this.subCategoryId,
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
          data = {
            categoryID: this.categoryId,
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        }
      }
      this.service.searchProduct(data).subscribe((response) => {
        if (response.success === true) {
          this.FilteredProducts = response.data;

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
          this.countOfProduct = response.data.length;
          this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
          this.pageOfItems = undefined;
        }
      });
    }
  }

  onChangePage(pageOfItems: Array<any>): void {
    this.pageOfItems = pageOfItems;
  }

  openFilter(): void {
    this.displayFilter = true;
  }

  openSort(): void {
    this.displaySort = true;
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

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.servicSearch.resultSearchBox = undefined;
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
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

  filterByPrice(): void {
    let data;
    switch (this.sortId) {
      case 1:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            countSell: -1,
            offer: this.offer,
            priceMin: this.valueDynamic,
            priceMax: this.highValueDynamic
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              countSell: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              countSell: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              countSell: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          }
        }

        break;
      case 2:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: 1,
            offer: this.offer,
            priceMin: this.valueDynamic,
            priceMax: this.highValueDynamic
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: 1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          }
        }

        break;
      case 3:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: -1,
            offer: this.offer,
            priceMin: this.valueDynamic,
            priceMax: this.highValueDynamic
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          }
        }

        break;
      case 4:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            updatedAt: -1,
            offer: this.offer,
            priceMin: this.valueDynamic,
            priceMax: this.highValueDynamic
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              updatedAt: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              offer: this.offer,
              priceMin: this.valueDynamic,
              priceMax: this.highValueDynamic
            };
          }
        }

        break;
    }

    this.service.searchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.FilteredProducts = response.data;

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
        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      }
    });

  }

  sort(sortId: any): void {
    this.sortId = sortId;
    let data;
    switch (sortId) {
      case 1:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 2:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: 1,
            offer: this.offer
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: 1,
              offer: this.offer
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
              offer: this.offer
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
              offer: this.offer
            };
          }
        }

        break;
      case 3:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: -1,
            offer: this.offer
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: -1,
              offer: this.offer
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
              offer: this.offer
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
              offer: this.offer
            };
          }
        }

        break;
      case 4:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            updatedAt: -1,
            offer: this.offer
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              updatedAt: -1,
              offer: this.offer
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              offer: this.offer
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              offer: this.offer
            };
          }
        }

        break;
    }

    this.service.searchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.FilteredProducts = response.data;

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
        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      }
    });

    this.displaySort = false;
  }

  hasOffer(): void {
    let data;
    switch (this.sortId) {
      case 1:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 2:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: 1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 3:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 4:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            updatedAt: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
    }

    this.service.searchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.FilteredProducts = response.data;

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
        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      }
    });
  }

  hasFreeSend(): void {
    let data;
    switch (this.sortId) {
      case 1:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            countSell: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              countSell: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 2:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: 1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: 1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 3:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            price: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              price: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
      case 4:

        if (this.categoryId === '0' && this.subCategoryId === '0' && this.subSubCategoryId === '0') {
          data = {
            updatedAt: -1,
            offer: this.offer,
            freeSend: this.freeSend
          };
        } else {
          if (this.subSubCategoryId !== '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              subSubCategory: this.subSubCategoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subSubCategoryId === '0' && this.subCategoryId !== '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              subCategory: this.subCategoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          } else if (this.subCategoryId === '0' && this.categoryId !== '0') {
            data = {
              categoryID: this.categoryId,
              updatedAt: -1,
              offer: this.offer,
              freeSend: this.freeSend
            };
          }
        }

        break;
    }

    this.service.searchProduct(data).subscribe((response) => {
      if (response.success === true) {
        this.FilteredProducts = response.data;

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
        this.countOfProduct = response.data.length;
        this.items = Array(this.countOfProduct).fill(0).map((x, i) => ({id: (i), name: `Item ${i}`}));
        this.pageOfItems = undefined;
      }
    });
  }
}
