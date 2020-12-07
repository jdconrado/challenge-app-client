import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import Product from '../../models/product';
import Category from '../../models/category';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product = new Product();
  loading: boolean = true;
  productId?: number;
  categories: Category[] = [];
  toogleAlert : {on: boolean, message?: string} = {on: false};
  constructor(private productService: ProductService, private categoryService: CategoryService,
    private router: Router, private route: ActivatedRoute, private auth: AuthService) {
    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if (id !== null){
        this.productId = parseInt(id);
      }else{
        this.router.navigate(['/not-found']);
      }
    })
  }

  async ngOnInit(): Promise<void> {
    if(this.productId !== undefined){
      this.product = await this.productService.getOne(this.productId);
      const user = this.auth.getCurrentUser();
      if(user=== undefined || user.id!== this.product.userId){
        this.router.navigate(['/not-found']);
      }else{
        this.categories = await this.categoryService.getCategoryList();
      }
    }
    this.loading = false;
  }

  onCancel(){
    this.router.navigate(['/my-products']);
  }

  async onUpdate(){
    this.toogleAlert.on= false;
    this.loading = true;
    if(this.product !== undefined && this.product.id !== undefined){
      const result = await this.productService.updateOne(this.product);
      if(!result.success){
        this.toogleAlert = {on: true, message: result.message};
      }else{
        this.toogleAlert = {on: true, message: 'The product has been updated.'}; 
      }
    }
    this.loading = false;
  }

  async onDelete(){
    this.toogleAlert.on= false;
    this.loading = true;
    if(this.product !== undefined && this.product.id !== undefined){
      const result = await this.productService.deleteOne(this.product.id);
      if(result.success){
        this.router.navigate(['/my-products']);
      }else{
        this.toogleAlert = {on: true, message: result.message};
      }
    }
    this.loading = false;
  }
  
}
