import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {UserService} from "../User.service";
import {Router} from "@angular/router";
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  getInfoUser: any;
  firstName;
  lastName;

  constructor(private serviceStorage:LocalStorageService,private breakpointObserver: BreakpointObserver, private userService: UserService, private route:Router) {
  }

  ngOnInit(): void {
    if (this.serviceStorage.getCurrentUser() ===true) {
      this.getInfoUser = this.serviceStorage.userJson;
      let data = {
        mobile: this.serviceStorage.userJson['mobile']
      }
      this.userService.onfindUser(data).subscribe((response) => {
        if (response['success'] === true) {
          this.firstName = response['data']['firstName'];
          this.lastName = response['data']['lastName'];

        }
      })
    }

  }
  exitUser(){
   this.serviceStorage.removeCurrentUser();
    this.route.navigate(['/home'])
  }
}
