import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AdminserviceService} from '../adminservice.service';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AdviceAnswerDialogComponent} from './advice-answer-dialog/advice-answer-dialog.component';

@Component({
  selector: 'app-admin-advices',
  templateUrl: './admin-advices.component.html',
  styleUrls: ['./admin-advices.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class AdminAdvicesComponent implements OnInit {


  advices: any[] = [];
  ref: DynamicDialogRef;

  constructor(private service: AdminserviceService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public dialogService: DialogService) {
  }


  ngOnInit(): void {

    this.service.getAllAdvices().subscribe((response) => {
      if (response.success === true) {
        this.advices = response.data;
      }
    });
  }
  active(id: any): void{
    this.service.activeAdvice(id).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' فعالسازی', detail: response.data});
        this.ngOnInit();
      }
      else{
        this.messageService.add({severity: 'error', summary: ' فعالسازی ', detail: response.data});
      }
    });
  }
  delete(id: any): void{
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteAdvice(id).subscribe((response) => {
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

  showAddAnswerAdviceDialog(id: any, answer: any): void {
    const ref = this.dialogService.open(AdviceAnswerDialogComponent, {
      data: {
        id: id,
        answer: answer
      },
      header: 'ثبت پاسخ مشاوره محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.service.getAllAdvices().subscribe((response) => {
          if (response.success === true) {
            this.advices = response.data;
          } else {
            this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
          }
        });
      }
    });
  }

  showEditAnswerAdviceDialog(id: any, answer: any): void {
    const ref = this.dialogService.open(AdviceAnswerDialogComponent, {
      data: {
        id: id,
        answer: answer
      },
      header: 'ویرایش پاسخ مشاوره محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.service.getAllAdvices().subscribe((response) => {
          if (response.success === true) {
            this.advices = response.data;
          } else {
            this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
          }
        });
      }
    });
  }

  deleteAnswer(id: any): any {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db

        this.service.answerAdvice(id, null).subscribe((response) => {
          if (response.success === true) {
            this.ngOnInit();
          } else {
            this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
          }
        });

      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });
  }

  viewProduct(id: any): void {
    this.router.navigate(['/home/detail/' + id]);
  }

}
