import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../Auth/user.service';
import {LayoutService} from '../../layout.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css'],
  providers: [MessageService]
})
export class SellerRegisterComponent implements OnInit {
  @ViewChild('ngOtpInput', {static: true}) ngOtpInputRef: any;
  display: boolean = false;
  public getCodeSmS:string;
  otdCode: '';
  public validationBtnPay: boolean = true;
  public invalidSMS: boolean = false;
  public timeLeft: number = 70;
  public interval;
  resendSMS: boolean = false;
  form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      {type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.'}
    ],
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'تکرار کلمه عبور را وارد کنید.'},
      {type: 'minlength', message: 'تکرار کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.'}
    ],
  };

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService,
              private messageService: MessageService,
              private authService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mobile: new FormControl([null, Validators.required]),
      password: new FormControl([null, Validators.required]),
    });

    this.form = this.formBuilder.group(
      {
        mobile: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(this.mobileRegix)
          ])
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5)
          ])
        ),
        confirmPassword: new FormControl(
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(5)
          ])
        ),
      }, {
        validators: this.password.bind(this)
      });
  }

  password(formGroup: FormGroup): any {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  register(): void {
    this.layoutService.registerSeller(this.form.value).subscribe((response) => {

      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'ثبت نام ', detail: response['data'], sticky: true});

      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data'], sticky: true});
      }
    });
  }
  startTimer() {
    this.timeLeft=70;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.resendSMS = true;
        this.timeLeft = 0;
      }

    }, 1000);
  }

  randomNumber() {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < 6; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return text;
  }
  sendSMS() {
    this.authService.onfindUser(this.form.value).subscribe((result) => {
      if (result['success'] === true) {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: result['data'], sticky: true});

      } else {
        this.display = true;
        this.authService.getTokenSms().subscribe((res) => {
          if (res['IsSuccessful'] === true) {
            this.getCodeSmS = this.randomNumber()
            let token = res['TokenKey']
            let data = {
              ParameterArray: [
                {Parameter: "VerificationCode", ParameterValue: this.getCodeSmS}
              ],
              Mobile: this.form.get('mobile').value,
              TemplateId: "40640"

            }

            this.authService.sendSms(data, token).subscribe((res1) => {
              if (res['IsSuccessful'] === true) {
                this.startTimer();
                // this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: res1['Message']});
              }
            })
          }
        })
      }
    })

  }

  onOtpChange(otp) {
    this.otdCode = otp;
    if (this.otdCode.length === 6) {
      if (this.otdCode !== this.getCodeSmS) {
        this.invalidSMS = true;
        this.validationBtnPay = true;
      } else {
        this.invalidSMS = false;
        this.validationBtnPay = false;
      }
    }
  }

  showDialog() {
    this.display = true;
  }


}
