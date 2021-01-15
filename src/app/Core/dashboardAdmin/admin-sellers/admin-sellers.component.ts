import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AdminserviceService} from '../adminservice.service';
import {Router} from '@angular/router';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {AdviceAnswerDialogComponent} from '../admin-advices/advice-answer-dialog/advice-answer-dialog.component';
import {SubCategoryEditDialogComponent} from '../admin-categories/sub-category-edit-dialog/sub-category-edit-dialog.component';
import {SellerDetailDialogComponent} from './seller-detail-dialog/seller-detail-dialog.component';

@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css'],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ]
})
export class AdminSellersComponent implements OnInit {

  sellers: any[] = [];
  ref: DynamicDialogRef;

  constructor(private service: AdminserviceService,
              private router: Router,
              private dialogService: DialogService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }


  ngOnInit(): void {
    this.service.getAllSellers().subscribe((response) => {
      if (response.success === true) {
        this.sellers = response.data;
      }
    });
  }

  getSellers(): any {
    this.service.getAllSellers().subscribe((response) => {
      if (response.success === true) {
        this.sellers = response.data;
      }
    });
  }

  active(id: any): void {
    this.service.activeSeller(id).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' فعالسازی', detail: response.data});
        this.ngOnInit();
      } else {
        this.messageService.add({severity: 'error', summary: ' فعالسازی ', detail: response.data});
      }
    });
  }

  deactive(id: any): void {
    this.service.deactiveSeller(id).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' غیرفعالسازی', detail: response.data});
        this.ngOnInit();
      } else {
        this.messageService.add({severity: 'error', summary: ' غیرفعالسازی ', detail: response.data});
      }
    });
  }

  delete(id: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSeller(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getSellers();
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  showSellerDetailDialog(id: string): void {
    let seller: any;
    this.service.showSeller(id).subscribe((response) => {
      if (response.success === true) {
        seller = response.data[0];

        const ref = this.dialogService.open(SellerDetailDialogComponent, {
          data: {
            seller: seller
          },
          header: 'مشاهده اطلاعات فروشنده',
          width: '70%'
        });

      } else {
        this.messageService.add({severity: 'error', summary: ' مشاهده اطلاعات فروشنده ', detail: response.data});
      }
    });
  }
}
