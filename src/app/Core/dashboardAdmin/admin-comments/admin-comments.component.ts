import { Component, OnInit } from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdminCommentsComponent implements OnInit {

  comments: any[] = [];
  constructor(private service: AdminserviceService,
              private  messageService: MessageService,
              private  confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {

    this.service.getAllComments().subscribe((response) => {
      if (response.success === true) {
        this.comments = response.data;
      }
    });
  }

  active(id: any): void{
    this.service.activeComment(id).subscribe((response) => {
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
        this.service.deleteComment(id).subscribe((response) => {
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
