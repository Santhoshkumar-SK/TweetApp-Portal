import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { PostedTweet } from 'src/app/models/posted-tweet.Model';
import { TweetResponse } from 'src/app/models/tweet-response.Model';
import { LoginService } from 'src/app/services/login.service';
import { TweetService } from 'src/app/services/tweet.service';
import { DeleteTweetComponent } from '../delete-tweet/delete-tweet.component';
import { PostTweetComponent } from '../post-tweet/post-tweet.component';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  @Input() tweetType: string = "";

  tweets: PostedTweet[];
  loggedinUser: string;
  isLiked: boolean = false;
  tweetResponse: BaseResponse<TweetResponse>;

  constructor(private tweetservice: TweetService, private toastr: ToastrService, private loginService: LoginService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loggedinUser = this.loginService.getLoggedUser();
    this.tweetType == "user" ? this.getAlltweetsofUser() : this.getAlltweets();
  }

  getAlltweetsofUser() {
    this.tweetservice.getTweetsofUser(this.loggedinUser).subscribe({
      next: (result) => {
        var response = result as BaseResponse<PostedTweet[]>;
        if (response.isSuccess) {
          this.tweets = response.result;
          this.checkisliked();
        } else {
          this.toastr.error(response.errorInfo, `Profile Tweets HTTP CODE - ${response.httpStatusCode}`);
        }
      },
      error: (err) => {
        var response = err.error as BaseResponse<PostedTweet[]>;
        this.toastr.error(response.errorInfo, `Profile Tweets HTTP CODE - ${response.httpStatusCode}`);
      }
    })
  }

  getAlltweets() {
    this.tweetservice.getalltweets().subscribe({
      next: (result) => {
        var response = result as BaseResponse<PostedTweet[]>;
        if (response.isSuccess) {
          this.tweets = response.result;
          this.checkisliked();
        } else {
          this.toastr.error(response.errorInfo, `Tweets HTTP CODE - ${response.httpStatusCode}`);
        }
      },
      error: (err) => {
        var response = err.error as BaseResponse<PostedTweet[]>;
        this.toastr.error(response.errorInfo, `Tweets HTTP CODE - ${response.httpStatusCode}`);
      }
    })
  }

  checkisliked() {
    this.tweets.forEach(twt => {
      twt.isliked = twt.likedUsers.includes(this.loggedinUser),
        twt.btnDisplayValue = "View replies"; new Date(twt.timeofPost)
    })
  }

  liketweet(tweet: PostedTweet) {
    this.tweetservice.likeTweet(this.loggedinUser, tweet.tweetId).subscribe({
      next: (result) => {
        var response = result as BaseResponse<TweetResponse>;
        if (response.isSuccess) {
          tweet.isliked = true;
          tweet.numberOfLikes += 1;
        } else {
          this.toastr.error(response.errorInfo, `Like Tweets HTTP CODE - ${response.httpStatusCode}`);
        }
      },
      error: (err) => {
        var response = err.error as BaseResponse<TweetResponse>;
        this.toastr.error(response.errorInfo, `Like Tweets HTTP CODE - ${response.httpStatusCode}`);
      }
    })
  }

  toOpenReplies(tweet: PostedTweet) {
    tweet.btnDisplayValue = tweet.btnDisplayValue == "Hide replies" ? "View replies" : "Hide replies";
    tweet.isViewReplies = !tweet.isViewReplies;
  }

  manageEditDialog(tweet: PostedTweet) {
    const dialogRef = this.dialog.open(PostTweetComponent, {
      data: {
        insightMessage: tweet.insightMessage,
        tweetMessage: tweet.tweetMessage,
        dialogTitle: 'Edit Tweet'
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result as PostedTweet);
        if (result.insightMessage != null) {
          result.tweetId = tweet.tweetId;
          this.editPostedTweet(result);
        }
      }
    });
  }

  manageDialogBox(tweet: PostedTweet, dialogtype: string) {

    const dialogRef = this.dialog.open(dialogtype == 'Delete' ? DeleteTweetComponent : PostTweetComponent,
      dialogtype == 'Delete' ? null : 
      dialogtype == 'Reply' ? { data: { insightMessage: null, tweetMessage: null, dialogTitle: `${dialogtype} Tweet` }} :
      { data: { insightMessage: tweet.insightMessage, tweetMessage: tweet.tweetMessage, dialogTitle: `${dialogtype} Tweet` }}
    );

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (dialogtype == 'Edit' || dialogtype == 'Reply') {
          if (result.insightMessage != null) {
            result.tweetId = tweet.tweetId;
            dialogtype == 'Edit' ? this.editPostedTweet(result) : this.replyTweet(result,tweet.tweetId)
          }
        } else {
          if (result == true) {
            this.deletePostedTweet(tweet);
          }
        }
      }
    });
  }

  editPostedTweet(tweet: PostedTweet) {
    this.tweetservice.editpostedtweet(tweet).subscribe({
      next: (result) => {
        this.tweetResponse = result as BaseResponse<TweetResponse>;
        if (this.tweetResponse.isSuccess) {
          this.toastr.success(this.tweetResponse.result.responseMessage, "Edit Tweet");
        } else {
          this.toastr.error(this.tweetResponse.errorInfo, `Edit Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.tweetResponse = err.error as BaseResponse<TweetResponse>;
        this.toastr.error(this.tweetResponse.errorInfo, `Edit Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
      },
      complete: () => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tweets/profile']);
        });
      }
    })
  }

  manageDeleteDialog(tweet: PostedTweet) {
    const dialogRef = this.dialog.open(DeleteTweetComponent);
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log(result);
        if (result == true) {
          this.deletePostedTweet(tweet);
        }
      }
    });
  }

  deletePostedTweet(tweet: PostedTweet) {
    console.log('inn')
    this.tweetservice.deletepostedtweet(tweet.tweetId, tweet.loginId).subscribe({
      next: (result) => {
        this.tweetResponse = result as BaseResponse<TweetResponse>;
        if (this.tweetResponse.isSuccess) {
          this.toastr.success(this.tweetResponse.result.responseMessage, "Delete Tweet");
        } else {
          this.toastr.error(this.tweetResponse.errorInfo, `Delete Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.tweetResponse = err.error as BaseResponse<TweetResponse>;
        this.toastr.error(this.tweetResponse.errorInfo, `Delete Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
      },
      complete: () => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tweets/profile']);
        });
      }
    });
  }


  replyTweet(tweet: PostedTweet,orgintweet : string) {
    tweet.isReplyFlag = true;
    this.tweetservice.postreply(tweet,orgintweet).subscribe({
      next : (result) => {
        this.tweetResponse = result as BaseResponse<TweetResponse>;
        if (this.tweetResponse.isSuccess) {
          this.toastr.success(this.tweetResponse.result.responseMessage, "Reply Tweet");
        } else {
          this.toastr.error(this.tweetResponse.errorInfo, `Reply Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
        }
      },
      error: (err) => {
        this.tweetResponse = err.error as BaseResponse<TweetResponse>;
        this.toastr.error(this.tweetResponse.errorInfo, `Reply Tweet HTTP CODE - ${this.tweetResponse.httpStatusCode}`);
      },
      complete: () => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tweets/profile']);
        });
      }
    })
  }

}