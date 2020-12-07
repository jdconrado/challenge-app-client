import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from './config';
import Product, { Filters } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ENDPOINT: string = `${API_URL}/product`;
  private options = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  };

  constructor(private http: HttpClient, private router: Router) {}

  async search(filters: Filters): Promise<Product[]>{
    try{
      const response: any = await this.http.post(`${this.ENDPOINT}/search`, {data: filters}, this.options).toPromise();
      return response.data.products as Product[];
    }catch(error){
      if (error.status == 403){
        this.router.navigate(["/login"]);
      }
    }
    return [];
  }

  async getOne(id: number): Promise<Product>{
    try{
      const response: any = await this.http.get(`${this.ENDPOINT}/get-one/${id}`, this.options).toPromise();
      return response.data.product as Product;
    }catch(error){
      if (error.status === 403){
        this.router.navigate(["/login"]);
      }else if(error.status === 404){
        this.router.navigate(["/not-found"]);
      }
      return new Product();
    }
  }

  async createOne(product: Product){
    try{
      const response: any = await this.http.post(`${this.ENDPOINT}/create`,{data:product}, this.options).toPromise();
      return {success: true};
    }catch(error){
      console.log(error);
      return {success: false, message: error.error? error.error.errorMessage: "An error has occurred, please try again later."};
    }
  }

  async updateOne(product: Product){
    try{
      const response: any = await this.http.patch(`${this.ENDPOINT}/update/${product.id}`,{data:product}, this.options).toPromise();
      return {success: true};
    }catch(error){
      console.log(error);
      return {success: false, message: error.error? error.error.errorMessage: "An error has occurred, please try again later."};
    }
  }

  async deleteOne(id: number){
    try{
      const response: any = await this.http.delete(`${this.ENDPOINT}/delete/${id}`, this.options).toPromise();
      return {success: true};
    }catch(error){
      console.log(error);
      return {success: false, message: error.error? error.error.errorMessage: "An error has occurred, please try again later."};
    }
  }

}
