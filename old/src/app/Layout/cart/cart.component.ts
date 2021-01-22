import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {CartService} from '../../serviceCart/cart.service';
import {LayoutService} from '../layout.service';
import {UserService} from '../../Auth/user.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../Auth/localStorageLogin/local-storage.service';
import * as moment from 'jalali-moment';
import {NgxSpinnerService} from 'ngx-spinner';

interface state {
  name: string,
  code: string
}

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  states: any[] = [];
  selectedState: any;
  cities: any[] = [];
  selectedCity: any;
  cols: any[];
  items: any[];
  state: state[];
  city: City[];
  display: boolean = true;
  access_token: any;
  formGroup: FormGroup;
  sumPrice = 0;
  userInfo = {
    id: '',
    firstName: '',
    lastName: '',
    mobile: '',
    phone: '',
    state: '',
    city: '',
    postalCode: '',
    plaque: '',
    address: ''
  };
  userInfologin: any[];

  pricePost: number = 0;

  formUser: FormGroup;
  userRegister = {
    mobile: '',
    password: ''
  };
  successLogin: boolean = true;
  public payment = {
    userID: '',
    mobile: '',
    price: '',
    pricePost:'',
    date: '',
    time: ''
  };
  xx: string;
  valueCountProduct = [];
  ServiceType: string;
  countList: string;

  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(private authService: UserService,
              private _formBuilder: FormBuilder,
              private serviceCart: CartService,
              private servicelayout: LayoutService,
              private messageService: MessageService,
              private localStorage: LocalStorageService,
              private spinner: NgxSpinnerService) {
    let myDate = new Date();
    this.payment.date = moment(Date.now()).locale('fa').format('YYYY/M/D');
    this.payment.time = moment(Date.now()).locale('fa').format('HH:mm:ss');


  }

  ngOnInit(): void {

    this.getTokenPost();
    this.getInfoUser();
    this.refreshCart();
    this.formUser = this._formBuilder.group({
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          image: new FormControl(this.countList, Validators.required),
        }),
        this._formBuilder.group({
          image: new FormControl('', Validators.required),
        }),
        this._formBuilder.group({
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl('', Validators.required),
          mobile: new FormControl('', Validators.required),
          phone: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          postalCode: new FormControl('', Validators.required),
          plaque: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
        }),
        this._formBuilder.group({
          ServiceType: new FormControl(''),

        }),
        this._formBuilder.group({
          offerPercent: new FormControl(''),

        }),
        this._formBuilder.group({
          uploadFile: ['']
        }),
      ])
    });

  }

  stateOnChange(code: any): void {
    this.spinner.show();
    let username = 'asd@123';
    let password = 'XdpB2bpHo2WQ';
    let ProvinceCode = code.value;
    // let data = "username=" + username + "&password=" + password + "&grant_type=" + "password" + "&ProvinceCode="+ProvinceCode;
    let data = {
      ProvinceCode: ProvinceCode
    };
    this.servicelayout.listCity(data, this.access_token).subscribe((response) => {
        if (response['ResCode'] === 0) {
          this.spinner.hide();
          this.cities = response['Data'];
        }
      },
      error => {
        console.log(error);
      });
  }

  cityOnChange(code: any): void {
    this.userInfo.city = code.value['label'];
  }

  onRegister() {
    this.servicelayout.updateUser(this.userInfologin['_id'], this.userInfo).subscribe((response) => {
      // console.log(response);
    });
    this.payment.userID = this.userInfologin['_id'];
    this.payment.mobile = this.userInfologin['mobile'];
    this.payment.pricePost=this.pricePost.toString();
    let priceFinal = this.sumPrice + (this.pricePost / 10);
    let data = {
      product: JSON.parse(localStorage.getItem('cartList')),
      user: this.payment,
      price: priceFinal
    };
    this.servicelayout.onPayment(data).subscribe((response) => {
      let url = response['data'];
      document.location.href = url;
    });

  }

  getInfoUser() {
    if (this.localStorage.getCurrentUser() === true) {
      this.successLogin = false;
      this.userInfologin = this.localStorage.userJson;
      let data = {
        mobile: this.userInfologin['mobile']
      };
      this.authService.onfindUser(data).subscribe((response) => {
        if (response['success'] === true) {
          this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
          this.userInfologin = this.localStorage.userJson;
          this.userInfo.id = this.userInfologin['_id'];
          this.userInfo.firstName = this.userInfologin['firstName'];
          this.userInfo.lastName = this.userInfologin['lastName'];
          this.userInfo.state = this.userInfologin['state'];
          this.userInfo.city = this.userInfologin['city'];
          this.userInfo.mobile = this.userInfologin['mobile'];
          this.userInfo.phone = this.userInfologin['phone'];
          this.userInfo.address = this.userInfologin['address'];
          this.userInfo.postalCode = this.userInfologin['postalCode'];
          this.userInfo.plaque = this.userInfologin['plaque'];
        }
      });
    }
  }

  loginUser(): void {
    this.authService.onLogin(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.successLogin = false;
        this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
        this.getInfoUser();
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response['data']});
      }
    });
  }

  registerUser(): void {
    this.authService.onRegister(this.userRegister).subscribe((response) => {
      if (response['success'] === true) {
        this.successLogin = false;
        this.authService.onLogin(this.userRegister).subscribe((response) => {
          if (response['success'] === true) {
            this.localStorage.saveCurrentUser(JSON.stringify(response['data']));
            this.getInfoUser();
          }
        });
        // this.getInfoUser();
      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data']});
      }
    });
  }

  deleteCart(item: any) {
    this.serviceCart.deleteItem(item);
    this.items = this.serviceCart.getItems();
    this.refreshCart();
  }

  refreshCart() {
    this.items = this.serviceCart.getItems();
    this.sumPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      this.countList='1';
      let data = {
        _id: this.items[i]['product']['cartList']._id
      };
      this.servicelayout.findProductID(data).subscribe((response) => {
        if (response.success === true) {
          let Inventory = response['data'][0]['Inventory'][0];
          if (Inventory.count > 0) {
            this.valueCountProduct.push(this.items[i]['product'].number);
            if (this.items[i]['product']['cartList'].offer === true) {
              let pricePercent: number = (this.items[i]['product']['cartList'].price * this.items[i]['product']['cartList'].offerPercent) / 100;
              this.sumPrice += (Number(this.items[i]['product']['cartList'].price) - pricePercent) * this.items[i]['product'].number;

            } else {
              this.sumPrice += (this.items[i]['product']['cartList'].price) * (this.items[i]['product'].number);
            }

          }
        }
      });


    }
    // this.sumPrice = sumPrice;
  }

  addCart(item: any, count: any) {
    let data = {
      _id: item['product']['cartList']._id
    };
    this.servicelayout.findProductID(data).subscribe((response) => {
      if (response.success === true) {
        let Inventory = response['data'][0]['Inventory'][0];
        if (Number(count.value) <= Number(Inventory.count)) {
          this.serviceCart.addToCart1(item['product'], count.value);
          this.refreshCart();
        } else {
          alert('این تعداد موجود نمی باشد');
        }
      }
    });


  }

  getTokenPost() {
    let username = 'asd@123';
    let password = 'SZj%5dClivUx';
    let model = 'username=' + username + '&password=' + password + '&grant_type=' + 'password';
    this.servicelayout.getTokenPost(model).subscribe((response) => {
      this.access_token = response['access_token'];
      this.servicelayout.listOstan(model, this.access_token).subscribe((response) => {
        this.states = response['Data'];

      });

    });
  }

  deliveryPrice(x) {
    this.spinner.show();
    this.pricePost = 0;
    let PayType;
    let data = [{
      ClientOrderId: '',
      CityID: '',
      Price: '',
      ServiceType: '',
      PayType: '',
      Weight: ''
    }];
    let countItem = this.serviceCart.getItems();

    data.splice(0, data.length);
    for (let i = 0; i < countItem.length; i++) {
      console.log(countItem[i]['product']['cartList'].freeSend)

      if (countItem[i]['product']['cartList'].freeSend === false) {
        data.push({
          CityID: this.userInfo.state,
          ClientOrderId: countItem[i]['product']['cartList']._id,
          PayType: '1',
          Price: countItem[i]['product']['cartList'].price,
          ServiceType: x,
          Weight: countItem[i]['product']['cartList'].weight
        });
      }
    }
    if(data.length>0){
      this.servicelayout.DeliveryPrice(data, this.access_token).subscribe((response) => {
        if (response['ResCode'] === 0) {
          this.spinner.hide();
          let result = response['Data'];
          console.log(result);
          for (var i = 0; i < result.length; i++) {
            this.pricePost += Number(result[i].ShippingCost + result[i].ShippingTax);
          }

        }
      });
    }
    else{
      this.spinner.hide();
    }
  }
}
