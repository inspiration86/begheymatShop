import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent implements OnInit {
  displayMobileMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(): void{
    this.displayMobileMenu = !this.displayMobileMenu;
  }
}
