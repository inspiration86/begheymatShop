import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment-help',
  templateUrl: './payment-help.component.html',
  styleUrls: ['./payment-help.component.css']
})
export class PaymentHelpComponent implements OnInit {
  events1 = [];

  constructor() {
  }

  ngOnInit(): void {
    this.events1 = [
      {status: 'ثبت نام در فروشگاه به قیمت', icon: '1', color: '#fff', image: 'add-user.svg'},
      {status: 'ورود به فروشگاه به قیمت', icon: '2', color: '#fff', image: 'login.svg'},
      {status: 'افزوردن محصول یا محصولات مورد نظر به سبد خرید', icon: '3', color: '#fff', image: 'shopping-cart.svg'},
      {status: 'مراجعه به صفحه سبد خرید', icon: '4', color: '#fff', image: 'shopping-cart-page.svg'},
      {status: 'تکمیل اطلاعات خریدار', icon: '5', color: '#fff', image: 'edit.svg'},
      {status: 'پرداخت آنلاین', icon: '6', color: '#fff', image: 'credit-card.svg'},
      {status: 'ارسال کالا', icon: '7', color: '#fff', image: 'delivery-truck.svg'},
      {status: 'تحویل کالا درب منزل', icon: '8', color: '#fff', image: 'home.svg'},
    ];
  }

}
