import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { UserInfoResponse } from 'src/app/models/user-info-response.Model';
import { UserInfo } from 'src/app/models/user-info.Model';
import { LoginService } from 'src/app/services/login.service';
import { TweetService } from 'src/app/services/tweet.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfoResponse : BaseResponse<UserInfo[]>;
  userinfo : UserInfo;
  loggedinUser : string;
  constructor(private tweetservice : TweetService,private toastr : ToastrService,private loginService : LoginService) { }

  ngOnInit(): void {
    this.loggedinUser = this.loginService.getLoggedUser();
    this.getUserInfoandTweets();
  }

  getUserInfoandTweets(){
    this.tweetservice.getUserdetails(this.loggedinUser).subscribe({
      next : (result) => {
        this.userinfoResponse = result as BaseResponse<UserInfo[]>;
        if(this.userinfoResponse.isSuccess){
          this.userinfo = this.userinfoResponse.result.filter(user => user.loginId == this.loggedinUser)[0];
        }else{
          this.toastr.error(this.userinfoResponse.errorInfo,`Profile User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
        }
      },
      error : (err) => {
        this.userinfoResponse = err as BaseResponse<UserInfo[]>;
        this.toastr.error(this.userinfoResponse.errorInfo,`Profile User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
      }
    })
  }

  

}
