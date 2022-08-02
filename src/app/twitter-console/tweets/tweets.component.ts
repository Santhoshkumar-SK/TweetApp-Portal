import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { LoginService } from 'src/app/services/login.service';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweets : PostedTweet[];
  loggedinUser : string;
  
  constructor(private tweetservice : TweetService,private toastr : ToastrService,private loginService : LoginService) { }

  ngOnInit(): void {
    this.loggedinUser = this.loginService.getLoggedUser();
    this.getAlltweetsofUser();
  }

  getAlltweetsofUser(){
    this.tweetservice.getTweetsofUser(this.loggedinUser).subscribe({
      next : (result) => {
        var response = result as BaseResponse<PostedTweet[]>;
        if(response.isSuccess){
          this.tweets = response.result;
        }else{
          this.toastr.error(response.errorInfo,`Profile Tweets HTTP CODE - ${response.httpStatusCode}`);
        }
      },
      error : (err) => {
        var response = err as BaseResponse<PostedTweet[]>;
        this.toastr.error(response.errorInfo,`Profile Tweets HTTP CODE - ${response.httpStatusCode}`);
      }
    })
  }

}
