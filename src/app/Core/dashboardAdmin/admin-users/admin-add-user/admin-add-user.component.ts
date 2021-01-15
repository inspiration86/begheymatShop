import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css'],
  providers: [MessageService]
})
export class AdminAddUserComponent implements OnInit {

  public form: FormGroup;
  mobileRegix = /^0?9[123]\d{8}$/;
  errorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' }
    ],
    password: [
      {type: 'required', message: 'رمزعبور را وارد کنید.'}
    ],
  };
  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.createform();
  }
  createform(): void {
    this.form = this.formBuilder.group({
      mobile: new FormControl(
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(this.mobileRegix)
        ]
      ),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      )
    });
  }



  submitForm(): void {
    this.service.addUser(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.messageService.add({severity: 'success', summary: ' ثبت اطلاعات ', detail: response.data});
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
