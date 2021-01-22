import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.css']
})
export class HomeFeatureComponent implements OnInit {
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
        items: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        loop: true
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
