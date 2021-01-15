import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {LayoutService} from '../layout.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {

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
  gifts: any[] = [];
  constructor(private service: LayoutService) {

  }
  ngOnInit(): void {
    this.service.showGift().subscribe((response) => {
      this.gifts = response['data'];
    });
  }

}
