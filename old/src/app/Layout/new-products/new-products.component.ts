import {Component, OnInit} from '@angular/core';
import {LayoutProductModel} from "../layoutProduct.model";
import {LayoutService} from "../layout.service";
import {response} from "express";
import {CartService} from "../../serviceCart/cart.service";

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent implements OnInit {
  val1: number = 1;
  val2: number = 1;
  val3: number = 1;
  val4: number = 1;
  display: boolean = false;
  valueCountProduct = [1, 1, 1, 1];
  product: LayoutProductModel[];
  cartList: any[] = [];
  viewProduct = {
    title: '',
    type: '',
    number: '',
    price: '',
    viewCount: '',
    detail: '',
    image: ''
  };

  constructor(private service: LayoutService, private serviceCart: CartService) {
  }

  ngOnInit(): void {
    this.service.showProduct().subscribe((response) => {
      if (response['success'] === true) {
        this.product = response['data'];
      }

    })

  }

  showDialog(data: any, i: any) {
    this.display = true;
    this.viewProduct.title = data['title'];
    this.viewProduct.type = data['type'];
    this.viewProduct.viewCount = data['viewCount'];
    this.viewProduct.image = data['image'];
    this.viewProduct.detail = data['detail'];
    this.viewProduct.number = this.valueCountProduct[i].toString();
    this.viewProduct.price = data['price'];

    console.log(data)
  }

  addCart(e: any, product: any) {
    let list = {
      cartList: product,
      number: e
    }

    this.serviceCart.addToCart(list);
    // this.cartList.push(list)
    // localStorage.setItem('cartList', JSON.stringify({cartList: this.cartList}));
    // const myData = JSON.parse(localStorage.getItem('cartList'));
    // console.log(myData)
  }

}
