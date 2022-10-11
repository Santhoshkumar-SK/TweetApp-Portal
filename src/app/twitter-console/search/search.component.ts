import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { UserInfo } from 'src/app/models/user-info.Model';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userinfoResponse : BaseResponse<UserInfo[]>;
  usersdetails : UserInfo[] =[];
  tweetType : string = null;
  showTweets : boolean = false;
  showSearch : boolean = true;

  constructor(private tweetService : TweetService,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  searchUser(searchvalue : string){
    this.showTweets = false;
    this.showSearch = true;
    this.tweetService.getUserdetails(searchvalue).subscribe({
      next: (result) => {
        this.userinfoResponse = result as BaseResponse<UserInfo[]>;
        if (this.userinfoResponse.isSuccess) {
          this.usersdetails = this.userinfoResponse.result;
        } else {
          this.toastr.error(this.userinfoResponse.errorInfo, `Search User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.userinfoResponse = err.error as BaseResponse<UserInfo[]>;
        this.toastr.error(this.userinfoResponse.errorInfo, `Search User Details HTTP CODE - ${this.userinfoResponse.httpStatusCode}`);
      }
    })
  }

  selectUser(user : UserInfo){
    this.tweetType = `user-${user.loginId}`;
    this.showTweets = true;
    this.showSearch = false;
  }

}
