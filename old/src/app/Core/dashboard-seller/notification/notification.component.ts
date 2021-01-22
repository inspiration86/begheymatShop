import { Component, OnInit } from '@angular/core';
import {SellerService} from '../seller.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  constructor(private service: SellerService) { }

  ngOnInit(): void {

    this.service.getNotifications().subscribe((response) => {
      if (response.success === true) {
        this.notifications = response.data;
        console.log(this.notifications);
      }
    });
  }

}
