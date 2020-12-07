import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import Product, { Filters } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  products: Product[] = [];  
  filters: Filters =  new Filters();
  colsNumber:number = 4;
  canClearSearch: boolean = false;
  loadMore: boolean = true;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.onResize(undefined);
    this.products = await this.productService.search(this.filters);
    if (this.products.length<20){
      this.loadMore = false;
    }
    this.loading = false;
  }

  onSearch(){
    const searchModalRef = this.dialog.open(SearchModalComponent);
    searchModalRef.afterClosed().subscribe(async (result) => {
      if(result!== undefined){
        this.loading = true;
        let search = false;
        if(result.name !== ""){
          this.filters.title = result.name;
          search = true;
        }
        if(result.priceFrom !== 0 || result.priceTo !==999999999){
          this.filters.price= {from: result.priceFrom, to: result.priceTo};
          search = true;
        }
        if(result.stockFrom !== 0 || result.stockTo !==999999999){
          this.filters.stock= {from: result.stockFrom, to: result.stockTo};
          search = true;
        }
        if(result.category !== -1){
          this.filters.categoryId= result.category;
          search = true;
        }
        if (search){
          const results = await this.productService.search(this.filters);
          if(results.length<20){
            this.loadMore = false;
          }
          this.products.push(...results);
        }
        this.loading = false;
        this.canClearSearch = true;
      }
    });
  }

  async onCreate(){
    const createProductModalRef = this.dialog.open(ProductModalComponent);
    createProductModalRef.afterClosed().subscribe(async (result) => {
      if (result){
        this.filters.page=0;
        this.products = await this.productService.search(this.filters);
        if (this.products.length<20){
          this.loadMore = false;
        }else{
          this.loadMore = true;
        }
      }
    });
  }
  
  async onLoadMore(){
    this.loading = true;
    this.filters.page+=1;
    const results = await this.productService.search(this.filters);
    if(results.length<20){
      this.loadMore = false;
    }
    this.products.push(...results);
    this.loading = false;
  }

  async clearSearch(){
    this.canClearSearch = false;
    this.loading = true;
    this.filters = new Filters();
    this.products = await this.productService.search(this.filters);
    this.loading = false;
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
