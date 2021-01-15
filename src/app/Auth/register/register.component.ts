import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    mobile: '',
    password: ''
  };
  formUser: FormGroup;
  display: boolean = false;
  public timeLeft: number = 90;
  public interval;

  constructor(private service: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      mobile: new FormControl(['']),
      password: new FormControl(['']),
    })
  }

  onRegister() {

    this.service.onRegister(this.user).subscribe((response) => {
      console.log(response);
      if (response['success'] === true) {
        //this.display = true;
      }
    })
  }

  onLogin() {
    this.service.onLogin(this.user).subscribe((response) => {
      if (response['success'] === false) {
        console.log(response['data'])
        this.display = true;
      } else {
        alert('login');
      }
    })
  }

  onOtpChange(otp) {
  }


  onsendSMS() {
    let data = {
      TO: this.user.mobile,
      TEXT: 'علیک'
    }
    this.service.onSendSMS(data).subscribe((response) => {
      console.log(response)
    })
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.resendSMS = true;
        this.timeLeft = 0;
      }

    }, 1000);
  }

}
