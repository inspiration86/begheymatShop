import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {MenuService} from '../menu.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categories: any[] = [];
  customOptions: OwlOptions = {
    autoplay: false,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: false,
    responsive: {
      0: {
        items: 2,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        loop: true
      },
      400: {
        items: 3,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        loop: true
      },
      740: {
        items: 5
      },
      940: {
        items: 5
      }
    }
  };
  constructor(private service: MenuService,
              private router: Router) { }

  ngOnInit(): void {
    this.categories = this.service.getCategories().subscribe((response) => {
      if (response.success === true){
        this.categories = response.data;
      }
    });
  }
  goProduct(categoryId: any, subCategoryId: any, subSubCategoryId: any): any {
    this.router.navigateByUrl('/home/product/' + categoryId + '/' + subCategoryId + '/' + subSubCategoryId);
  }
}
