import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { 
  }

  login(email,password){
    const obj = {
      email:email,
      password:password
    }
    return this.http.post(environment.LOGIN,obj);
  }

  signup(obj){
     return this.http.post(environment.SIGNUP,obj);
  }

  forgotPassword(email){
    const obj = {
      email:email
    }
    return this.http.post(environment.FORGOTPASSWORD,obj);
  }

  logut(){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.get(environment.LOGOUT,header);
  }

  updatePassword(obj){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.put(environment.UPDATEPASSWORD,obj,header);
    
  }
}
