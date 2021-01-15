import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AdminserviceService} from '../adminservice.service';
import {FeatureAddDialogComponent} from './feature-add-dialog/feature-add-dialog.component';
import {FeatureEditDialogComponent} from './feature-edit-dialog/feature-edit-dialog.component';
import {FeatureValueAddDialogComponent} from './feature-value-add-dialog/feature-value-add-dialog.component';
import {FeatureValueEditDialogComponent} from './feature-value-edit-dialog/feature-value-edit-dialog.component';

@Component({
  selector: 'app-admin-features',
  templateUrl: './admin-features.component.html',
  styleUrls: ['./admin-features.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class AdminFeaturesComponent implements OnInit {

  features: any[];
  ref: DynamicDialogRef;
  loading = false;

  constructor(private service: AdminserviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public dialogService: DialogService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): any {
    this.service.getAllFeatures().subscribe((response) => {
      if (response.success === true) {
        this.features = response.data;
      } else {
        this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
      }
    });
  }

  showAddFeatureDialog(): void {
    const ref = this.dialogService.open(FeatureAddDialogComponent, {
      header: 'ثبت ویژگی محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  showEditFeatureDialog(id: string, titleFarsi: string, titleLatin: string): void {
    const ref = this.dialogService.open(FeatureEditDialogComponent, {
      data: {
        id,
        titleFarsi,
        titleLatin
      },
      header: 'ویرایش ویژگی محصول',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  deleteFeature(featureId: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  showAddFeatureValueDialog(featureId: string, titleFarsi: string, titleLatin: string): void {
    const ref = this.dialogService.open(FeatureValueAddDialogComponent, {
      data: {
        featureId
      },
      rtl: false,
      header: 'ثبت مقدار برای ویژگی محصول ' + titleFarsi + '( ' + titleLatin + ' )',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  showEditFeatureValueDialog(id: string, value: string): void {
    const ref = this.dialogService.open(FeatureValueEditDialogComponent, {
      data: {
        id,
        value
      },
      header: 'ویرایش مقدار ویژگی محصول',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true){
        this.getFeatures();
      }
    });
  }

  deleteFeatureValue(featureValueId: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

}
