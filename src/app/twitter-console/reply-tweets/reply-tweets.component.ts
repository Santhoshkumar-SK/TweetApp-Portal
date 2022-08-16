import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { TweetService } from 'src/app/services/tweet.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reply-tweets',
  templateUrl: './reply-tweets.component.html',
  styleUrls: ['./reply-tweets.component.css']
})
export class ReplyTweetsComponent implements OnInit {
  @Input() orgintweet : string = "";
  replies : PostedTweet[] = [];
  constructor(private tweetService : TweetService,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getallReplies(this.orgintweet);
  }

  getallReplies(id : string){
    this.tweetService.getallRepliesforTweet(id).subscribe({
      next : (result) => {
        var response = result as BaseResponse<PostedTweet[]>;
        this.replies = response.result;     
      },
      error : (err) => {
        var respose = err.error as BaseResponse<PostedTweet[]>;        
        this.toastr.error(respose.errorInfo,`Get Replies HTTP CODE - ${respose.httpStatusCode}`);
      }
    })
  }

}
