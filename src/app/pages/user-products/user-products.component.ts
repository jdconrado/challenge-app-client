import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import Product from '../../models/product';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss', '../dashboard/dashboard.component.scss']
})
export class UserProductsComponent implements OnInit {
  loading: boolean = true;
  products: Product[] = [];  
  colsNumber:number = 4;
  loadMore: boolean = true;
  page: number = 0;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.onResize(undefined);
    this.products = await this.userService.getUserProducts(this.page);
    if (this.products.length<20){
      this.loadMore = false;
    }
    this.loading = false;
  }

  async onLoadMore(){
    this.loading = true;
    this.page+=1;
    const results = await this.userService.getUserProducts(this.page);
    if(results.length<20){
      this.loadMore = false;
    }
    this.products.push(...results);
    this.loading = false;
  }

  async onCreate(){
    const createProductModalRef = this.dialog.open(ProductModalComponent);
    createProductModalRef.afterClosed().subscribe(async (result) => {
      if (result){
        this.page = 0;
        this.products = await this.userService.getUserProducts(this.page);
        if (this.products.length<20){
          this.loadMore = false;
        }else{
          this.loadMore = true;
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    const innerWidth = window.innerWidth
    if(innerWidth<650){
      this.colsNumber = 1;
    }else if(innerWidth<900){
      this.colsNumber = 2;
    }else if (innerWidth<1100){
      this.colsNumber = 3;
    }
  }

}
