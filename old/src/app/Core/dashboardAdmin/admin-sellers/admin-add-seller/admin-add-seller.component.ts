import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AdminserviceService} from '../../adminservice.service';

@Component({
  selector: 'app-admin-add-seller',
  templateUrl: './admin-add-seller.component.html',
  styleUrls: ['./admin-add-seller.component.css'],
  providers: [MessageService]
})
export class AdminAddSellerComponent implements OnInit {

  public registerForm: FormGroup;

  mobileRegix = /^0?9[123]\d{8}$/;
  registerErrorMessages = {
    mobile: [
      {type: 'required', message: 'شماره موبایل را وارد کنید.'},
      {type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.'},
      {type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.'}
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
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
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
      )
    })
  }

  submitRegisterForm(): void{
    this.service.addSeller(this.registerForm.value).subscribe((response) => {
      if (response.success === true) {

        console.log(response);
        this.messageService.add({severity: 'success', summary: ' ثبت اطلاعات ', detail: response.data});

      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

}
