import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {Route, Router} from '@angular/router';

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
  isExpanded1 = true;
  showSubmenu1 = false;
  isShowing1 = false;

  isExpanded2 = true;
  showSubmenu2 = false;
  isShowing2 = false;

  isLogged = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {

    this.isLogged = this.localStorage.getCurrentUser();

    if (!this.isLogged) {
      this.router.navigate(['/admin']);
    }
  }

  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }

}
