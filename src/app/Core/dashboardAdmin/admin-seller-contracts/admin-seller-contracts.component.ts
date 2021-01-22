import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {SellerContractEditDialogComponent} from './seller-contract-edit-dialog/seller-contract-edit-dialog.component';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-admin-seller-contracts',
  templateUrl: './admin-seller-contracts.component.html',
  styleUrls: ['./admin-seller-contracts.component.css'],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ]
})
export class AdminSellerContractsComponent implements OnInit {

  contracts: any[] = [];

  constructor(private service: AdminserviceService,
              private  messageService: MessageService,
              private  dialogService: DialogService,
              private  confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {

    this.service.getAllSellerContracts().subscribe((response) => {
      if (response.success === true) {
        this.contracts = response.data;
        console.log(this.contracts);
      }
    });
  }

  active(id: any): void {
    this.service.activeSellerContract(id).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' فعالسازی', detail: response.data});
        this.ngOnInit();
      } else {
        this.messageService.add({severity: 'error', summary: ' فعالسازی ', detail: response.data});
      }
    });
  }

  deactive(id: any): void {
    this.service.deactiveSellerContract(id).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' غیر فعالسازی', detail: response.data});
        this.ngOnInit();
      } else {
        this.messageService.add({severity: 'error', summary: ' غیر فعالسازی ', detail: response.data});
      }
    });
  }

  showEditDialog(id: string): void {
    let contract: any;
    this.service.getSellerContractById(id).subscribe((response) => {
      if (response.success === true) {
        contract = response.data[0];

        const ref = this.dialogService.open(SellerContractEditDialogComponent, {
          data: {
            contract: contract
          },
          header: 'ویرایش قرارداد فروشنده',
          width: '70%'
        });

      } else {
        this.messageService.add({severity: 'error', summary: 'ویرایش قرارداد فروشنده ', detail: response.data});
      }
    });
  }

  delete(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSellerContract(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          } else {
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

  downloadFile(url: any) {
    window.open(url);
  }

}
