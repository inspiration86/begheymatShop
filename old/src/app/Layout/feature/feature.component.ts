import { Component, OnInit } from '@angular/core';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay: true,
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
      },
      200: {
        items: 3,
      },
      400: {
        items: 4,
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    }
  };


  constructor() { }

  ngOnInit(): void {
  }

}
