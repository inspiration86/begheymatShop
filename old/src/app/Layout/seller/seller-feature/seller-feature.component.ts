import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-feature',
  templateUrl: './seller-feature.component.html',
  styleUrls: ['./seller-feature.component.css']
})
export class SellerFeatureComponent implements OnInit {

  events1 = [];

  constructor() {
  }

  ngOnInit(): void {
    this.events1 = [
      {status: 'ثبت نام در پنل فروشندگان به قیمت', icon: '1', color: '#fff', image: 'add-user.svg'},
      {status: 'تکمیل اطلاعات فروشنده (حقیقی یا حقوقی)', icon: '2', color: '#fff', image: 'edit.svg'},
      {status: 'بررسی اطلاعات شما توسط تیم پشتیبانی', icon: '3', color: '#fff', image: 'view.svg'},
      {status: 'تایید و فعالسازی امکانات پنل', icon: '4', color: '#fff', image: 'user-check.svg'},
      {status: 'ثبت کالا در پنل فروشندگان', icon: '5', color: '#fff', image: 'add-pic.svg'},
      {status: 'فروش کالا در به قیمت', icon: '6', color: '#fff', image: 'goal.svg'}
    ];
  }

}
