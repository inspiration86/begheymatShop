import {DeviceDetectorService} from 'ngx-device-detector';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css'],
})


export class TopHeaderComponent implements OnInit {
  @ViewChild('accountDropDown') accountDropDown: ElementRef;
  isLogged: boolean;

  constructor(private deviceService: DeviceDetectorService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
  }

  exitUser() {
    this.localStorage.removeCurrentUser();
    this.ngOnInit();
  }

  toggleAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.toggle('topbar-dropdown--opened');
  }

  closeAccountDropDown(): void {
    this.accountDropDown.nativeElement.classList.remove('topbar-dropdown--opened');
  }

  openAccountDropDown(): void {
    if (this.deviceService.isDesktop() === true) {
      this.accountDropDown.nativeElement.classList.add('topbar-dropdown--opened');
    }
  }

}
