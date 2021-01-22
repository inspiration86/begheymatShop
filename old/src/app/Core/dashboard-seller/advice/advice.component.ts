import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SellerService} from '../seller.service';
import {LocalStorageService} from 'src/app/Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';
import {AddAdviceAnswerDialogComponent} from './add-advice-answer-dialog/add-advice-answer-dialog.component';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css'],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class AdviceComponent implements OnInit {

  advices: any[];
  ref: DynamicDialogRef;
  loading = false;
  isLogged: boolean;

  constructor(private sellerService: SellerService,
              private router: Router,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              public dialogService: DialogService,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged === true) {
      this.sellerService.getProductAdvices(this.localStorage.userJson._id).subscribe((response) => {
        if (response.success === true) {
          this.advices = response.data;
        } else {
          this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
        }
      });
    }

  }

  showAddAnswerAdviceDialog(id: any, answer: any): void {
    const ref = this.dialogService.open(AddAdviceAnswerDialogComponent, {
      data: {
        id: id,
        answer: answer
      },
      header: 'ثبت پاسخ مشاوره محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.sellerService.getProductAdvices(this.localStorage.userJson._id).subscribe((response) => {
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
    const ref = this.dialogService.open(AddAdviceAnswerDialogComponent, {
      data: {
        id: id,
        answer: answer
      },
      header: 'ویرایش پاسخ مشاوره محصول',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.sellerService.getProductAdvices(this.localStorage.userJson._id).subscribe((response) => {
          if (response.success === true) {
            this.advices = response.data;
          } else {
            this.messageService.add({severity: 'error', summary: ' دریافت اطلاعات ', detail: response.data});
          }
        });
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

        this.sellerService.answerProductAdvice(id, null).subscribe((response) => {
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
