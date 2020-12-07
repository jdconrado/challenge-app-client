import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import Product from '../../models/product';
import Category from '../../models/category';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  product: Product = new Product();
  loading: boolean = false;
  categories: Category[] = [];
  toogleAlert : {on: boolean, message?: string} = {on: false};
  reload: boolean = false;
  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.product.category ={id:-1};
  }

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getCategoryList();
  }

  async onSubmmit(){

    this.toogleAlert.on= false;
    this.loading = true;
    if(this.product.title!== undefined && this.product.title!== ""
      && this.product.price!== undefined && this.product.stock!== undefined
      && this.product.category.id !== -1 ){
      const result = await this.productService.createOne(this.product);
      if(!result.success){
        this.toogleAlert = {on: true, message: result.message};
      }else{
        this.toogleAlert = {on: true, message: 'The product has been created.'}; 
        this.product = new Product();
        this.product.category ={id: -1};
        this.reload = true;
      }
    }else{
      this.toogleAlert = {on: true, message: 'All fields are required.'}; 
    }
    this.loading = false;
  }

}
