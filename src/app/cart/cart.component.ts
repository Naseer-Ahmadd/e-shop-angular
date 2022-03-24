import { ProductsService } from './../_services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts:any
  // cartItems :any 
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
this.getFromCart()
  }

  

  getFromCart(): void {
    this.productService.getFromCart().subscribe((data: any) => {
      this.carts = data.data;
      console.log(this.carts);
    });
  }

  _increamentQTY(id:any, quantity:Number): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.productService.increaseQty(payload).subscribe(() => {
      this.getFromCart();
      alert('Product Added');
    });
  }

  _decreamentQTY(id:any, quantity:Number): void {
    const payload = {
      productId: id,
      quantity,
    };
    this.productService.increaseQty(payload).subscribe(() => {
      this.getFromCart();
      alert('Product removed');
    });
  }


  chceckout(){

  }
}
