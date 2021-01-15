import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  public wishListCount = 0;

  constructor(private http: HttpClient) { }

  getWishListCount(id: any): any{
    return this.http.get('http://194.5.175.25:3005/api/v1/user/countWishlist/' + id);
  }

  getWishListFromApi(id: any): void {

    if (id !== null) {
      this.getWishListCount(id).subscribe((response) => {
        if (response.success === true) {
          this.wishListCount = response.data;
        } else {
          this.wishListCount = 0;
        }
      });
    }
  }
}
