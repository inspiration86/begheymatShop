import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../localStorageLogin/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccesslevelGuard implements CanActivate {

  constructor(private localStorage: LocalStorageService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorage.userType === 'seller') {
      return true;
    }
    if (this.localStorage.userType === 'user') {
      return true;
    }
  }

}
