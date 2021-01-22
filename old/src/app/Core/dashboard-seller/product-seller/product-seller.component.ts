import { Component, OnInit } from '@angular/core';
import {SellerService} from '../seller.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-product-seller',
  templateUrl: './product-seller.component.html',
  styleUrls: ['./product-seller.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class ProductSellerComponent implements OnInit {

  products: any[];

  loading = false;
  constructor(private sellerService: SellerService,
              private messageService: MessageService,
              private router: Router,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.sellerService.getProducts(this.localStorage.userJson._id).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  getProducts(): any{
    this.sellerService.getProducts(this.localStorage.userJson._id).subscribe((response) => {
      if (response.success === true) {
        this.products = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  delete(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.sellerService.deleteProduct(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getProducts();
          } else {
            this.messageService.add({severity: 'error', summary: ' حذف اطلاعات ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

}
