import { Component, OnInit, Input } from '@angular/core';
import Product from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  @Input() userEditable!: boolean;
  productIcon: string = 'verified';

  constructor() { }

  ngOnInit(): void {
   const rand = Math.random();
   if (rand < 0.25){
     this.productIcon='stars';
   }else if (rand < 0.5){
    this.productIcon='new_releases';
   }else if (rand < 0.75){
    this.productIcon='brightness_high';
   }
  }

}
