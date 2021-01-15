import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SellerDetailDialogComponent} from '../admin-sellers/seller-detail-dialog/seller-detail-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';
import {NotificationDetailDialogComponent} from './notification-detail-dialog/notification-detail-dialog.component';
import {NotificationEditDialogComponent} from './notification-edit-dialog/notification-edit-dialog.component';
import {NotificationAddDialogComponent} from './notification-add-dialog/notification-add-dialog.component';

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './admin-notifications.component.html',
  styleUrls: ['./admin-notifications.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class AdminNotificationsComponent implements OnInit {

  notifications: any[] = [];

  constructor(private service: AdminserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.service.getAllNotifications().subscribe((response) => {
      if (response.success === true) {
        this.notifications = response.data;
        console.log(this.notifications);
      }
    });
  }

  getNotifications(): any {
    this.service.getAllNotifications().subscribe((response) => {
      if (response.success === true) {
        this.notifications = response.data;
      }
    });
  }

  showNotificationDetailDialog(id: string): void {
    let notification: any;
    this.service.getNotificationById(id).subscribe((response) => {
      if (response.success === true) {
        notification = response.data;

        const ref = this.dialogService.open(NotificationDetailDialogComponent, {
          data: {
            notification: notification
          },
          header: 'مشاهده اطلاعیه',
          width: '70%'
        });

      } else {
        this.messageService.add({severity: 'error', summary: ' مشاهده اطلاعیه ', detail: response.data});
      }
    });
  }

  showNotificationEditDialog(id: string): void {
    let notification: any;
    this.service.getNotificationById(id).subscribe((response) => {
      if (response.success === true) {
        notification = response.data;

        const ref = this.dialogService.open(NotificationEditDialogComponent, {
          data: {
            notification: notification
          },
          header: 'ویرایش اطلاعیه',
          width: '70%'
        });

        ref.onClose.subscribe(res => {
          if (res === true) {
            this.getNotifications();
          }
        });

      } else {
        this.messageService.add({severity: 'error', summary: ' مشاهده اطلاعیه ', detail: response.data});
      }
    });
  }

  showNotificationAddDialog(): void {
    const ref = this.dialogService.open(NotificationAddDialogComponent, {
      header: 'ثبت اطلاعیه',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getNotifications();
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
        this.service.deleteNotification(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getNotifications();
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
