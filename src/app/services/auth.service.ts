import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from './config';
import User from '../models/user';

@Injectable()
export class AuthService {
  private currentUser?: User;
  private loaded: boolean = false;
  private ENDPOINT: string = `${API_URL}/auth`;
  private options = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  async isLoogedIn(): Promise<boolean>{
    if (!this.loaded){
      this.loaded = true;
      try{
        const response: any = await this.http.get(`${API_URL}/user/info`, this.options).toPromise();
        this.currentUser = response.data.user as User;
        return true;
      }catch(error){
        return false;
      }
    }
    return this.currentUser !== undefined;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  async loginUser(user: User): Promise<{success: boolean, message?: string}> {
    try{
      const response: any = await this.http.post(`${this.ENDPOINT}/login`, {data:user}, this.options).toPromise();
      this.currentUser = new User();
      this.currentUser.id = response.data.user.id;
      this.currentUser.name = response.data.user.name;
      return {success: true};
    }catch(error){
      return {success: false, message: error.error? error.error.errorMessage: "An error has occurred, please try again later."};
    }
  }

  async registerUser(user: User): Promise<{success: boolean, message?: string}> {
    try{
      const response: any = await this.http.post(`${this.ENDPOINT}/sign-up`, {data:user}, this.options).toPromise();
      this.currentUser = new User();
      this.currentUser.id = response.data.user.id;
      this.currentUser.name = response.data.user.name;
      return {success: true};
    }catch(error){
      console.log(error);
      return {success: false, message: error.error? error.error.errorMessage: "An error has occurred, please try again later."};
    }
  }

  async logOut(){
    try{
      await this.http.get(`${this.ENDPOINT}/logout`, this.options).toPromise();
    }catch(error){}
    this.currentUser = undefined;
  }
}
