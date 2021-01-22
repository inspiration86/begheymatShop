import {Component, OnInit} from '@angular/core';
import {CartService} from '../../serviceCart/cart.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../Auth/user.service';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  providers: [MessageService]
})
export class TopMenuComponent implements OnInit {
  display: boolean;
  displayModalLogin: boolean;
  displayForgetpassword: boolean;
  displayRegister: boolean;
  displayMobileMenu = true;
  displayModalSellerLogin = false;
  cartlist: any[] = [];
  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  items: MenuItem[]= [];
  sumOfPrice = 0;
 successSearch = false;
  listResultSearch: SelectItem[];
countBadge = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private serviceCart: CartService,
              private authService: UserService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private breakpointObserver: BreakpointObserver,
              private route: Router) {

    this.display = false;
    this.items = [
      {
        label: 'صفحه اصلی',
        icon: 'pi pi-pw pi-home',
        routerLink: '/'
      },
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-list',
        items: [
          {
            label: 'کالای دیجیتال',
            items: [
              {
                label: 'گوشی موبایل',
                items: [
                  {
                    label: 'سامسونگ',
                    icon: 'pi pi-fw pi-angle-left',
                  }]},
              {
                label: 'لوازم جانبی گوشی',
                icon: 'pi pi-fw pi-angle-left',
              }
            ]
          },
          {
            label: 'آرایشی بهداشتی',
            items: [
              {
                label: 'کرم پودر',
                icon: 'pi pi-fw pi-angle-left',
              },
              {
                label: 'رژ لب',
                icon: 'pi pi-fw pi-angle-left',
              }
            ]},
          {
            label: 'مواد غذایی',
            items: [
              {
                label: 'رب گوجه فرنگی',
                icon: 'pi pi-fw pi-angle-left',
              },
              {
                label: 'روغن مابع',
                icon: 'pi pi-fw pi-angle-left',
              }
            ]
          }
        ]
      },
      {
        label: 'تخفیف ها و پیشنهادها',
        icon: 'pi pi-briefcase',
        routerLink: '/'
      },
      {
        label: 'فروشنده شو',
        icon: 'fas fa-shopping-basket',
        command: event => this.route.navigate(['/seller/register'])
      },
      {
        label: 'سوال داری؟',
        icon: 'pi pi-fw pi-question-circle',
        routerLink: '/home/faq'
      },
      {
        label: 'ارتباط با ما',
        icon: 'pi pi-fw pi-info-circle',
        routerLink: '/home/about'
      }
    ];
    this.listResultSearch = [
      {label: 'ماسک', value: null},
      {label: 'ژل ضدعفونی کننده دست' , value: {id: 1, name: 'New York', code: 'NY'}},
      {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
      {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
      {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
      {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
    ];
  }

  showModalDialogRegister(): void {
    this.displayRegister = !this.displayRegister;
    this.displayForgetpassword = false;
    this.displayModalLogin = false;
  }
  showMobileMenu(): void {
    console.log('clicked');
    this.displayMobileMenu = true;
    this.displayForgetpassword = false;
    this.displayModalLogin = false;


  }
  showModalDialogLogin(): void {
    this.displayModalLogin = true;
    this.displayForgetpassword = false;
    // this.displayRegister = false;
  }
  showModalDialogSellerLogin(): void {
    this.displayModalSellerLogin = true;
    this.displayForgetpassword = false;
    this.displayModalLogin = false;
  }
  showModalShoppingCart(): void {
    this.display = true;
    this.displayRegister = false;
    this.displayModalLogin = false;
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }
getAllPrice(){
  this.cartlist = this.serviceCart.getItems();
  this.sumOfPrice = 0;
  this.countBadge = 0;
  for (var i = 0; i < this.cartlist.length; i++){
    let count = Number(this.cartlist[i]['product']['number'])*Number(this.cartlist[i]['product']['cartList'].price);
      this.sumOfPrice += count;
      this.countBadge++;

  }
}
  showModalDialogForgetPassword(): void {
    this.displayModalLogin = false;
    this.displayForgetpassword = !this.displayForgetpassword;
    this.displayRegister = false;
  }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      mobile: new FormControl(['', Validators.required]),
      password: new FormControl(['', Validators.required]),
    });
    // localStorage.removeItem("cartList");
this.getAllPrice();
  }

  onDeleteCart(item: any): void {
    this.serviceCart.deleteItem(item);
    this.cartlist = this.serviceCart.getItems();
    this.getAllPrice();
  }

  login(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.displayModalLogin=!this.displayModalLogin;
        localStorage.setItem('user', JSON.stringify( response['data'] ));
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  register(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        localStorage.setItem('user', JSON.stringify(this.userRegister));
        this.displayModalLogin = !this.displayModalLogin;
      }
      else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data'] });
      }
    });
  }
  search(event: any) {
    this.successSearch = true;
    const serachTerm = event.target.value.toLowerCase();

    if(serachTerm.length <= 0){
      this.successSearch = false;
    }

  }
  onSelect(address: any) {
    this.successSearch = false;
  }
}
