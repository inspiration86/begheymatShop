import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http:HttpClient) { }

  onDisplayBasket(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/user/basketList',data);
  }
  getPayment(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/user/getPayment',data);
  }
  onfindUser(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/user', data);
  }
 updateUser(id:any,data: any) {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/updateUser/'+id, data);
  }
  changePasswordUser(id:any,data: any) {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/changePassword/'+id, data);
  }
}
