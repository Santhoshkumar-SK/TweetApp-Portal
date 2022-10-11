import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordComponent } from 'src/app/authorization/forget-password/forget-password.component';
import { BaseResponse } from 'src/app/models/base-response.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { TweetResponse } from 'src/app/models/tweet-response.Model';
import { UserInfo } from 'src/app/models/user-info.Model';
import { LoginService } from 'src/app/services/login.service';
import { TweetService } from 'src/app/services/tweet.service';
import { environment } from 'src/environments/environment';
import { PostTweetComponent } from '../post-tweet/post-tweet.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfoResponse: BaseResponse<UserInfo[]>;
  userinfo: UserInfo;
  loggedinUser: string;
  tweetType: string = "loggeduser";
  tweetResponse: BaseResponse<TweetResponse>;
  loginResponse : BaseResponse<LoginResponse>;
  constructor(private tweetservice: TweetService, private toastr: ToastrService, private loginService: LoginService, private dialog: MatDialog,private router : Router) { }

  ngOnInit(): void {
    this.loggedinUser = this.loginService.getLoggedUser();
    this.getUserInfoandTweets();
  }

  getUserInfoandTweets() {
    this.tweetservice.getUserdetails(this.loggedinUser).subscribe({
      next: (result) => {
        this.userinfoResponse = result as BaseResponse<UserInfo[]>;
        if (this.userinfoResponse.isSuccess) {
          this.userinfo = this.userinfoResponse.result.filter(user => user.loginId == this.loggedinUser)[0];
        } else {
          this.toastr.error(this.userinfoResponse.errorInfo, `Profile User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.userinfoResponse = err.error as BaseResponse<UserInfo[]>;
        this.toastr.error(this.userinfoResponse.errorInfo, `Profile User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
      }
    })
  }

  manageDialogBox() {
    const dialogRef = this.dialog.open(PostTweetComponent,{data : {
      insightMessage : null,
      tweetMessage : null,
      dialogTitle : 'Post Tweet'
    }});
    dialogRef.afterClosed().subscribe({
      next : (result) => {        
        console.log(result as PostedTweet);
        if (result.insightMessage != null) {
          this.postnewTweet(result);
        }
      }
    });
  }

  postnewTweet(tweet : PostedTweet){
    this.tweetservice.postnewtweet(tweet).subscribe({
      next: (result) => {
        this.tweetResponse = result as BaseResponse<TweetResponse>;
        if (this.tweetResponse.isSuccess) {
          this.toastr.success(this.tweetResponse.result.responseMessage, "Post Tweet");
        } else {
          this.toastr.error(this.tweetResponse.errorInfo, `Post Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.tweetResponse = err.error as BaseResponse<TweetResponse>;
        this.toastr.error(this.tweetResponse.errorInfo, `Post Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
      },
      complete : () => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tweets/profile']);
      }); 
      }
    })
  }

  managePasswordDialog(){
    const dialogRef = this.dialog.open(ForgetPasswordComponent);
    dialogRef.afterClosed().subscribe({
      next : (result) => {        
        console.log(result);
        if (result != undefined && result != null) {          
          this.changepassword(result);
        }
      }
    });
  }

  changepassword(password : string){
    this.tweetservice.forgetPassword(this.loggedinUser,password).subscribe({
      next : (result) => {
        this.loginResponse = result as BaseResponse<LoginResponse>;
        if(this.loginResponse.isSuccess){
          this.toastr.success(this.loginResponse.result.loginMessage, "Forget Password");
        }else {
          this.toastr.error(this.loginResponse.errorInfo, `Forget Password HTTP CODE - ${this.loginResponse.httpStatusCode}`);
        }
      },
      error:(err)=>{
        this.loginResponse = err as BaseResponse<LoginResponse>;
        this.toastr.error(this.loginResponse.errorInfo, `Forget Password HTTP CODE - ${this.loginResponse.httpStatusCode}`);
      },
      complete: ()=>{
        localStorage.removeItem(environment.tokenKeyName);
        this.router.navigate(['']);
      }
    })
  }

}
