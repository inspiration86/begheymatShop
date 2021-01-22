import {Component, OnInit} from '@angular/core';
import {UserModel} from "../User.model";
import {UserService} from "../User.service";
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public listProducts: any[];
  spinnerSuccess:boolean=true;
  cols: any[];
  userID:any;
  constructor(private userService: UserService, private serviceStorage:LocalStorageService) {
    this.cols = [
      {field: 'candidateNumber', header: 'شماره داوطلب'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},
      {field: 'birthday', header: 'تاریخ تولد  '},
      {field: 'serialNumber', header: 'سریال شناسنامه'}
    ];

  }

  ngOnInit(): void {
    if (this.serviceStorage.getCurrentUser() === true) {
      let data = {
        userID: this.serviceStorage.userJson['_id']
      }
      this.userService.onDisplayBasket(data).subscribe((response) => {
        if (response['success'] === true) {
          this.spinnerSuccess=false
          this.listProducts = response['data'];

        }

      })
    }
  }

}
