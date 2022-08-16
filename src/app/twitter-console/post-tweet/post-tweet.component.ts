import { DatePipe } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseResponse } from 'src/app/models/base-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { TweetResponse } from 'src/app/models/tweet-response.Model';
import { LoginService } from 'src/app/services/login.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface PosttweetDialogData {
  insightMessage : string;
  tweetMessage : string;
  dialogTitle : string;
}

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  posttweetForm : FormGroup;
  formtitle : string;
  tweet : PostedTweet = new PostedTweet();
  tweetResponse : BaseResponse<TweetResponse>;
  datePipe = new DatePipe('en-US');

  constructor(@Inject(MAT_DIALOG_DATA) public inputdata: PosttweetDialogData,private loginService : LoginService) { }
  
  ngOnInit(): void {
    this.formtitle = this.inputdata.dialogTitle;
    this.posttweetForm = new FormGroup({
      "insightmessage" : new FormControl(this.inputdata.insightMessage,Validators.required),
      "tweetMessage" : new FormControl(this.inputdata.tweetMessage,[Validators.required,Validators.maxLength(144)])      
    });
  }

  posttweet(){
    this.tweet.insightMessage = this.posttweetForm.value['insightmessage'];
    this.tweet.tweetMessage = this.posttweetForm.value['tweetMessage'];
    this.tweet.loginId = this.loginService.getLoggedUser();
    this.tweet.timeofPost = this.datePipe.transform((new Date), 'yyyy-MM-dd'); //T0h:mm:ss
    this.tweet.numberOfLikes = 0;
    this.tweet.isReplyFlag = false;
    this.tweet.likedUsers = [];
    this.tweet.repliedTweetIds = [];
  }

}
