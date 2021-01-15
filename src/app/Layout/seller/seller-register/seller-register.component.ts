import { Component, OnInit } from '@angular/core';
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

  form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' }
    ],
    password: [
      { type: 'required', message: 'کلمه عبور را وارد کنید.' },
      { type: 'minlength', message: 'کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.' }
    ],
    confirmPassword: [
      { type: 'required', message: 'تکرار کلمه عبور را وارد کنید.' },
      { type: 'minlength', message: 'تکرار کلمه عبور نمی تواند کمتر از 5 کاراکتر باشد.' }
    ],
  };

  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService,
              private messageService: MessageService) { }
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
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  register(): void {
    this.layoutService.registerSeller(this.form.value).subscribe((response) => {

      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'ثبت نام ', detail: response['data'], sticky: true });

      } else {
        this.messageService.add({severity: 'error', summary: 'ثبت نام ', detail: response['data'], sticky: true });
      }
    });
  }

}
