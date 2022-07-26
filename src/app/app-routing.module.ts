import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './authorization/forget-password/forget-password.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { IndexPageComponent } from './twitter-console/index-page/index-page.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"signup",component:SignUpComponent},
  {path:"tweet",component : IndexPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
