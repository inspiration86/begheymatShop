import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private title: Title, private  meta: Meta) {
  }

  ngOnInit(): void {
    this.title.setTitle('درباره به قیمت');
    this.meta.updateTag(
      {
        name: 'keywords',
        content: 'فروشگاه اینترنتی به قیمت, به قیمت, فروشگاه, خرید گوشی, خرید موبایل, خرید ارزان, خرید به قیمت, خرید به صرفه, خرید تبلت'
      },
    );
  }

}
