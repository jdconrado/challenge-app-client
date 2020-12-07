import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from './config';
import Product from '../models/product';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ENDPOINT: string = `${API_URL}/user`;
  private options = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  };

  constructor(private http: HttpClient, private router: Router) { }

  async getUserProducts(page: number): Promise<Product[]>{
    try{
      const response: any = await this.http.get(`${this.ENDPOINT}/products?page=${page}`, this.options).toPromise();
      return response.data.products as Product[];
    }catch(error){
      if (error.status == 403){
        this.router.navigate(["/login"]);
      }
    }
    return [];
  }

  async getUserInfo():Promise<User>{
    try{
      const response: any = await this.http.get(`${this.ENDPOINT}/info`, this.options).toPromise();
      return response.data.user as User;
    }catch(error){
      if (error.status == 403){
        this.router.navigate(["/login"]);
      }
      return new User();
    }
  }
}
