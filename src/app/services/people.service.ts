import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  index(page,per_page,user_id){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.get(environment.PEOPLE+'?page='+page+'&per_page='+per_page+'&user_id='+user_id,header);
  }
  store(obj){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.post(environment.PEOPLE,obj,header);
  }

  update(obj){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.put(environment.PEOPLE+'/'+obj.id,obj,header);
  }

  indexAll(page,per_page,value){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.get(environment.PEOPLEALL+'?page='+page+'&per_page='+per_page+'&value='+value,header);
  }

  checkPeople(obj){
    const token = localStorage.getItem('token');
    const header = {
      headers: new HttpHeaders()
      .set('Authorization',`Bearer ${token}`)
    };
    return this.http.post(environment.CHECKPEOPLE,obj,header);
    
  }
}
