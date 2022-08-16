import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authorization/login/login.component';
import { ForgetPasswordComponent } from './authorization/forget-password/forget-password.component';
import { IndexPageComponent } from './twitter-console/index-page/index-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './authorization/auth.interceptor';
import { TweetService } from './services/tweet.service';
import { SideNavComponent } from './twitter-console/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomePageComponent } from './twitter-console/home-page/home-page.component';
import { SearchComponent } from './twitter-console/search/search.component';
import { ProfileComponent } from './twitter-console/profile/profile.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { TweetsComponent } from './twitter-console/tweets/tweets.component';
import { ReplyTweetsComponent } from './twitter-console/reply-tweets/reply-tweets.component';
import { PostTweetComponent } from './twitter-console/post-tweet/post-tweet.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteTweetComponent } from './twitter-console/delete-tweet/delete-tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    IndexPageComponent,
    SignUpComponent,
    SideNavComponent,
    HomePageComponent,
    SearchComponent,
    ProfileComponent,
    TweetsComponent,
    ReplyTweetsComponent,
    PostTweetComponent,
    DeleteTweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({timeOut:6000}),
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [TweetService, {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
