import { Component, OnInit } from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {CommissionEditDialogComponent} from './commission-edit-dialog/commission-edit-dialog.component';
import {CommissionAddDialogComponent} from './commission-add-dialog/commission-add-dialog.component';

@Component({
  selector: 'app-admin-commission',
  templateUrl: './admin-commission.component.html',
  styleUrls: ['./admin-commission.component.css'],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ]
})
export class AdminCommissionComponent implements OnInit {

  commissions: any[] = [];
  categories: any[] = [];
  constructor(private service: AdminserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.service.getAllCommissions().subscribe((response) => {
      if (response.success === true) {
        this.commissions = response.data;
      }
    });
    this.getCategories();
  }

  getCommissions(): any {
    this.service.getAllCommissions().subscribe((response) => {
      if (response.success === true) {
        this.commissions = response.data;
      }
    });
  }

  getCategories(): any{
    this.service.getCategories().subscribe((response) => {
      if (response.success === true) {
        this.categories = response.data;

      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showCommissionEditDialog(id: string): void {
    let commission: any;
    this.service.getCommissionById(id).subscribe((response) => {
      if (response.success === true) {
        commission = response.data[0];
        const ref = this.dialogService.open(CommissionEditDialogComponent, {
          data: {
            categories: this.categories,
            commission: commission
          },
          header: 'ویرایش کمیسیون',
          width: '70%'
        });

        ref.onClose.subscribe(res => {
          if (res === true) {
            this.getCommissions();
          }
        });

      } else {
        this.messageService.add({severity: 'error', summary: ' ویرایش کمیسیون ', detail: response.data});
      }
    });
  }

  showCommissionAddDialog(): void {
    const ref = this.dialogService.open(CommissionAddDialogComponent, {
      data: {
        categories: this.categories
      },
      header: 'ثبت کمیسیون',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getCommissions();
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
        this.service.deleteCommission(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getCommissions();
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
