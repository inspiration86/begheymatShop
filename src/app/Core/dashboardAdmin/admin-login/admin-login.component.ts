import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AdminserviceService} from '../adminservice.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  providers: [
    MessageService
  ]
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogged = false;
  loginErrorMessages = {
    username: [
      {type: 'required', message: 'نام کاربری را وارد کنید.'}
    ],
    password: [
      {type: 'required', message: 'کلمه عبور را وارد کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              private messageService: MessageService,
              private localStorage: LocalStorageService,
              private  router: Router) {
  }

  ngOnInit(): void {

    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged) {
      if (this.localStorage.userType === 'masterAdmin') {
        this.router.navigate(['/admin/index']);
      }
    }
    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl(
          null,
          Validators.compose([
            Validators.required,
          ])
        ),
        password: new FormControl(
          null,
          Validators.compose([
            Validators.required
          ])
        )
      }
    );
  }


  login(): void {
    this.service.login(this.loginForm.value).subscribe((response) => {
      if (response.success === true) {
        this.localStorage.saveCurrentUser(JSON.stringify(response.data));
        this.router.navigate(['/admin/index']);
      } else {
        this.messageService.add({severity: 'error', summary: ' ورود ', detail: response.data});
      }
    });
  }

}
