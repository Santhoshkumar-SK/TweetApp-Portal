export class PostedTweet {
      tweetId: string;
      loginId: string;
      insightMessage: string;
      timeofPost: string;
      tweetMessage: string;
      numberOfLikes: number;
      likedUsers : string[];
      isReplyFlag: boolean;
      repliedTweetIds: string[];
      isliked ?: boolean;
      isViewReplies ?: boolean = false;
      btnDisplayValue ?:string = "View replies";
}
