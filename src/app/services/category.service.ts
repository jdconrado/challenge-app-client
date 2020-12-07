import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from './config';
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private ENDPOINT: string = `${API_URL}/category`;
  private options = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  };
  private categories?: Category[];

  constructor(private http: HttpClient, private router: Router) { }

  async getCategoryList(): Promise<Category[]>{
    if (this.categories=== undefined){
      try{
        const response: any = await this.http.get(`${this.ENDPOINT}/list`, this.options).toPromise();
        this.categories =  response.data.categories;
      }catch(error){
        if (error.status == 403){
          this.router.navigate(["/login"]);
        }
        this.categories = [];
      }
    }
    return this.categories || [];
    
  }
}
