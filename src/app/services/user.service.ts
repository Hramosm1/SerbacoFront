import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';

@Injectable()

export class UserService {
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public url:String;
  public identity;
  public token;

  constructor(public _http:HttpClient) { 
    this.url = GLOBAL.url;
  }

  login(user, gettoken2 = null):Observable<any>{
    if(gettoken2 !=null) user.gettoken = gettoken2;
    let params = JSON.stringify(user)    
    return this._http.post(this.url + '/login', params,{headers:this.headers});
  }

  navbarPadre(id):Observable<any>{
    return this._http.get(this.url + '/navbar/'+ id,{headers:this.headers});
  }

  navbarSon(id):Observable<any>{
    return this._http.get(this.url + '/navbarSon/'+ id,{headers:this.headers});
  }
  
  getIdentity(){
    let identity2 = JSON.parse(sessionStorage.getItem('identity'))
    if(identity2 != 'undefined'){
      this.identity = identity2;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token2 = sessionStorage.getItem('token');

    if(token2 != 'undefined'){
      this.token = token2
    }else{
      this.token = null;
    }
    return this.token;
  }
}
