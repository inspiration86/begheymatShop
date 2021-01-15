import {Component, OnInit} from '@angular/core';
import {UserService} from "../User.service";
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-payment-user',
  templateUrl: './payment-user.component.html',
  styleUrls: ['./payment-user.component.css']
})
export class PaymentUserComponent implements OnInit {
  payment: any[] = [];
  spinnerSuccess:boolean=true
  cols: any[];
  user:any;
  userID:string;
  constructor(private userService: UserService,  private serviceStorage:LocalStorageService) {
  }


  ngOnInit(): void {
    if (this.serviceStorage.getCurrentUser() ===true) {
      let data = {
        userID:this.serviceStorage.userJson['_id']
      }
      this.userService.getPayment(data).subscribe((response) => {
        if (response['success'] === true) {
          this.spinnerSuccess=false
          this.payment = response['data'];

        }
      })
    }
  }

}
