import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-seller-detail-dialog',
  templateUrl: './seller-detail-dialog.component.html',
  styleUrls: ['./seller-detail-dialog.component.css']
})
export class SellerDetailDialogComponent implements OnInit {

  seller: any;
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.seller = this.config.data.seller;

    console.log(this.seller);
  }

}
