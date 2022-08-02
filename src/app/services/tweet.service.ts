import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient : HttpClient) { }

  getUserdetails(username : string){
    let urltosend = environment.serverUrl + '/users/search/'+username;    
    return this.httpClient.get(urltosend);
  }

  getTweetsofUser(username : string){
    let urltosend = `${environment.serverUrl}/${username}`;
    return this.httpClient.get(urltosend);
  }

}
