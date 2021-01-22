import { EditSliderDialogComponent } from './edit-slider-dialog/edit-slider-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AddSliderDialogComponent } from './add-slider-dialog/add-slider-dialog.component';
import { AdminserviceService } from './../adminservice.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class HomepageComponent implements OnInit {

  sliders: any[] = [];
  constructor(private service: AdminserviceService,
    private  messageService: MessageService,
    public dialogService: DialogService,
    private  confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.getSliders();
  }

  getSliders(): any{
    this.service.getSliders().subscribe((response) => {
      if (response.success === true) {
        this.sliders = response.data;
      }
    });
  }
  showAddSliderDialog(): void {
    const ref = this.dialogService.open(AddSliderDialogComponent, {
      header: 'ثبت اسلایدر جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getSliders();
      }
    });
  }
  showEditSliderDialog(id: any, link: string, tag: string, imageurl: string): void {
    const ref = this.dialogService.open(EditSliderDialogComponent, {
      data: {
        id,
        link,
        tag,
        imageurl
      },
      header: 'ویرایش اسلایدر',
      width: '70%',
      contentStyle: {"direction": "rtl"}
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getSliders();
      }
    });
  }

  deleteSlider(id: any): void{
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSlider(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          }
          else{
            this.messageService.add({severity: 'error', summary: ' حذف ', detail: response.data});
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
