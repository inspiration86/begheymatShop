import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {CartService} from '../../../serviceCart/cart.service';
import {UserService} from '../../../Auth/user.service';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {MenuService} from '../../menu.service';
import {SearchService} from 'src/app/search.service';
import {Observable} from 'rxjs';
import {Post} from '../../../Post';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.css'],
  providers: [MessageService]
})
export class MobileHeaderComponent implements OnInit {
  @ViewChild('mobileMenu') mobileMenu: ElementRef;
  @ViewChild('accountDropDown') accountDropDown: ElementRef;
  post: Post[];
  pageOfItems: Array<any>;
  categories: any[] = [];
  menuCategories: MenuItem[] = [];
  showCartList: boolean;
  isLogged: boolean;
  displayModalLogin: boolean;
  displayForgetpassword: boolean;
  displayRegister: boolean;
  items: MenuItem[];
  valueDynamic = 1000000;
  highValueDynamic = 50000000;
  options: Options = {
    floor: 1000000,
    ceil: 50000000,
    step: 1000000
  };
  countOfProduct = 5;
  displayMobileMenu = false;
  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  display = false;
  displaySearch = false;
  displayFilter = true;
  cartlist: any[] = [] ;
  sumOfPrice = 0;
  countBadge = 0;
  offer = false;
  freeSend = false;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: Post[] = [];
  autoCompleteList: any[] = [];
  productSearch: any;
  textSearch: any;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(private router: Router,
              private serviceCart: CartService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private service: MenuService,
              public dataService: SearchService,
              private breakpointObserver: BreakpointObserver,
              private localStorage: LocalStorageService,
              private authService: UserService) {

    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

        let subList: MenuItem[] = [];
        let subSubList: MenuItem[] = [];

        this.menuCategories.push({
          label: 'همه محصولات',
          command: event => this.goProduct(0, 0, 0)
        });

        this.categories.forEach(cat => {
          subList = [];
          if (cat.SubCategory.length > 0) {
            subList.push({
              label: 'همه',
              command: event => this.goProduct(cat._id, 0, 0)
            });
            cat.SubCategory.forEach(sub => {
              subSubList = [];
              if (sub.SubSubCategory.length > 0) {
                subSubList.push({
                  label: 'همه',
                  icon: 'pi pi-fw pi-angle-left',
                  command: event => this.goProduct(cat._id, sub._id, 0)
                });
                sub.SubSubCategory.forEach(subSub => {
                  subSubList.push({
                    label: subSub.title,
                    icon: 'pi pi-fw pi-angle-left',
                    command: event => this.goProduct(cat._id, sub._id, subSub._id)
                  });
                });
              }
              subList.push({
                label: sub.title,
                items: subSubList
              });
            });


            this.menuCategories.push({
              label: cat.title,
              items: subList
            });
          } else {
            this.menuCategories.push({
              label: cat.title,
              command: event => this.goProduct(cat._id, 0, 0)
            });
          }


        });
      }
    });

    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        routerLink: '/'
      },
      {
        label: 'دسته بندی محصولات',
        icon: 'pi pi-fw pi-list',
        items: this.menuCategories
      },
      {
        label: 'فروشنده شو',
        icon: 'fas fa-shopping-basket',
        command: event => this.router.navigate(['/sellerBe'])
      },
      {
        label: 'سوال داری؟',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/home/faq'
      },
      {
        label: 'درباره ما',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/about'
      },
      {
        label: 'راهنمای خرید',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/help'
      }
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    setInterval(() => {
      this.getAllPrice();
    }, 1000);

    this.formUser = this.fb.group({
      mobile: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
    });

    this.dataService.getPosts().subscribe(posts => {
      this.post = posts
      this.dataService.postsData = posts;
    });
    // when user types something in input, the value changes will come through this
    // this.myControl.valueChanges.subscribe(userInput => {
    //   this.autoCompleteExpenseList(userInput);
    // });
  }

  showModalDialogForgetPassword(): void {
    this.displayModalLogin = false;
    this.displayForgetpassword = !this.displayForgetpassword;
    this.displayRegister = false;
  }

  showModalDialogLogin(): void {
    this.displayModalLogin = true;
    this.displayForgetpassword = false;
    // this.displayRegister = false;
  }

  openMobileMenu(): void {
    this.displayMobileMenu = true;
  }

  closeMobileMenu(): void {
    this.mobileMenu.nativeElement.classList.remove('mobilemenu--open');
  }

  toggleAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.toggle('topbar-dropdown--opened');
  }

  closeAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.remove('topbar-dropdown--opened');
  }

  showModalShoppingCart(): void {
    this.display = true;
  }

  getAllPrice() {
    this.cartlist = this.serviceCart.getItems();
    this.sumOfPrice = 0;
    this.countBadge = 0;
    this.showCartList = true;

    if (this.cartlist != null) {
      if (this.cartlist.length > 0) {
        for (var i = 0; i < this.cartlist.length; i++) {
          if (this.cartlist[i]['product']['cartList'].offer === true) {
            let pricePercent: number = (this.cartlist[i]['product']['cartList'].price * this.cartlist[i]['product']['cartList'].offerPercent) / 100;
            this.sumOfPrice += (Number(this.cartlist[i]['product']['cartList'].price) - pricePercent) * this.cartlist[i]['product'].number;

          } else {
            this.sumOfPrice += (this.cartlist[i]['product']['cartList'].price) * (this.cartlist[i]['product'].number);
          }
          // let count = Number(this.cartlist[i]['product']['number']) * Number(this.cartlist[i]['product']['cartList'].price);
          // this.sumOfPrice += count;
          this.countBadge++;
          this.showCartList = false;

        }
      }
    }
  }

  onDeleteCart(item: any): void {
    this.serviceCart.deleteItem(item);
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }

  openSearch(): void {
    this.displaySearch = true;
  }

  login(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.displayModalLogin = !this.displayModalLogin;
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  register(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.displayModalLogin = !this.displayModalLogin;
      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data']});
      }
    });
  }

  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any) {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }


  onSelectedFilter(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0) {
      this.post = this.dataService.filteredListOptions();
    } else {
      this.post = this.dataService.postsData;
    }

  }
}
