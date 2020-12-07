import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import Category from '../../models/category';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit {
  options: any ={ 
    name: "",
    priceFrom: 0,
    priceTo: 999999999,
    stockFrom: 0,
    stockTo: 999999999,
    category: -1
  };
  categories: Category[] =[];
  constructor(private categoryService: CategoryService) {

  }

  async ngOnInit(): Promise<void> {
    this.categories = await this.categoryService.getCategoryList();
  }

}
