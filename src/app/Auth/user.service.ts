import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  onRegister(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/register', data);
  }
  onLogin(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/login', data);
  }
  onfindUser(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/user', data);
  }
  onSendSMS(data: any) {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/sendSMS',data);
  }
  getTokenSms() {
    let data = {
      UserApiKey: 'f2a1c337366e0cd3ddffc337',
      SecretKey: 'it66)%#teBC!@*&'
    };
    return this.http.post('https://RestfulSms.com/api/Token', data);
  }
  sendSms(data:any,token:any) {
    const headers = {
      'content-type': 'application/json',
      'x-sms-ir-secure-token':token
    }

    return this.http.post('https://RestfulSms.com/api/Token', data,{'headers': headers});
  }
}
