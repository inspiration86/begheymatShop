import {Component, HostListener, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {OverlayService} from './overlay.service';
import {NgxSpinnerService} from "ngx-spinner";
import {Router, NavigationEnd} from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'فروشگاه اینترنتی به قیمت';
  isShow: boolean;
  topPosToStartShowing = 100;

  constructor(public overlayService: OverlayService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              private metaTagService: Meta,
              private router: Router) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'G-NGBH3VE6ZH',
            {
              'page_path': event.urlAfterRedirects
            }
          );
        }
      }
    );

  }

  ngOnInit(): void {

    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      { name: 'keywords', content: 'فروشگاه به قیمت، محصولات پاک کننده به قیمت، لوازم بهداشتی به قیمت' },
      {name: 'description', content: 'فروشگاه اینترنتی به قیمت'},

    ]);
  }


  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  gotoCart(): void{
    this.router.navigateByUrl('/home/cart');
  }
  gotoWishlist(): void{
    this.router.navigateByUrl('/home/wishlist');
  }
  gotoProduct(): void{
    this.router.navigateByUrl('/home/product/0/0/0');

  }
}
