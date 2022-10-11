import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './authorization/forget-password/forget-password.component';
import { LoginComponent } from './authorization/login/login.component';
import { TweetAuthGuard } from './authorization/login/tweet-auth.guard';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { HomePageComponent } from './twitter-console/home-page/home-page.component';
import { IndexPageComponent } from './twitter-console/index-page/index-page.component';
import { ProfileComponent } from './twitter-console/profile/profile.component';
import { SearchComponent } from './twitter-console/search/search.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"signup",component:SignUpComponent},
  {path:"tweets",component : IndexPageComponent,children : [
    {path:"home",component:HomePageComponent},
    {path:"search",component:SearchComponent},
    {path:"profile",component:ProfileComponent}
  ], canActivate : [TweetAuthGuard]},
  {path:"**",redirectTo:"/tweets/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
