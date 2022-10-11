import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostedTweet } from '../models/posted-tweet.Model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient : HttpClient) { }

  getUserdetails(username : string){
    let urltosend = `${environment.userapiUrl}/users/search/${username}`;  
    return this.httpClient.get(urltosend);
  }

  getTweetsofUser(username : string){
    let urltosend = `${environment.tweetapiUrl}/${username}`;
    return this.httpClient.get(urltosend);
  }

  likeTweet(username : string,id : string){
    let urltosend = `${environment.tweetapiUrl}/${username}/like/${id}`;
    var body = {};
    return this.httpClient.put(urltosend,body);
  }

  getallRepliesforTweet(id : string){
    let urltosend = `${environment.tweetapiUrl}/reply/${id}`;
    return this.httpClient.get(urltosend);
  }

  getalltweets(){
    let urltosend = `${environment.tweetapiUrl}/all`;
    return this.httpClient.get(urltosend);
  }

  postnewtweet(tweet : PostedTweet){
    let urltosend = `${environment.tweetapiUrl}/${tweet.loginId}/add`;
    return this.httpClient.post(urltosend,tweet);
  }

  editpostedtweet(tweet : PostedTweet){
    let urltosend = `${environment.tweetapiUrl}/${tweet.loginId}/update/${tweet.tweetId}`;
    return this.httpClient.put(urltosend,tweet);
  }

  deletepostedtweet(tweetid : string,username : string){
    let urltosend = `${environment.tweetapiUrl}/${username}/delete/${tweetid}`;
    return this.httpClient.delete(urltosend);
  }

  postreply(tweet : PostedTweet,orgintweet : string){
    let urltosend = `${environment.tweetapiUrl}/${tweet.loginId}/reply/${orgintweet}`;
    return this.httpClient.post(urltosend,tweet);
  }

  forgetPassword(username : string,newpassword:string){
    let urltosend = `${environment.authapiUrl}/${username}/forgot?newpassword=${newpassword}`;
    return this.httpClient.get(urltosend);
  }
}
