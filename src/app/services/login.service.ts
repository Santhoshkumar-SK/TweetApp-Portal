import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user-info.Model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }
  
  logintoApp(username : string,password : string){
    let urltosend = environment.authapiUrl + '/login';
    const body ={
      "loginId" : username,
      "password" : password
    };
    return this.httpClient.post(urltosend,body);
  }

  registerinApp(userinfo : UserInfo){
    let urltosend = environment.userapiUrl + '/register';
    console.log(userinfo);
    return this.httpClient.post(urltosend,userinfo);
  }

  getLoggedUser():string{
    var token = localStorage.getItem(environment.tokenKeyName);
    var decoded_token : any = jwt_decode(token);
    return decoded_token.Username
  }

}
