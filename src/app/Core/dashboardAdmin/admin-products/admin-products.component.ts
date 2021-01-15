import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Auth/localStorageLogin/local-storage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AdminserviceService } from './../adminservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [
    MessageService, ConfirmationService
  ]
})
export class AdminProductsComponent implements OnInit {

  products: any[];

  loading = false;
  constructor(private service: AdminserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): any{
    this.service.getAllProducts().subscribe((response) => {
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
        this.service.deleteProduct(id).subscribe((response) => {
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

  deleteFeature(id: any) {
    this.service.deleteProductFeature(id).subscribe((response) => {
      if (response['success'] === true) {
        this.ngOnInit();
        this.messageService.add({severity: 'success', summary: ' حذف ویژگی ', detail: response['data']});
      }
    });
  }
}
