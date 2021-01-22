import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-notification-detail-dialog',
  templateUrl: './notification-detail-dialog.component.html',
  styleUrls: ['./notification-detail-dialog.component.css']
})
export class NotificationDetailDialogComponent implements OnInit {

  notification: any;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.notification = this.config.data.notification
  }

}
