import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { UserInfoResponse } from 'src/app/models/user-info-response.Model';
import { UserInfo } from 'src/app/models/user-info.Model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private loginService : LoginService,private toastr : ToastrService,private route : Router) { }
  signupForm : FormGroup;
  userInfo : UserInfo;
  signupResponse : BaseResponse<UserInfoResponse>;
  isPasswordValid : boolean = true;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      "firstname" : new FormControl(null,Validators.required),
      "lastname" : new FormControl(null,Validators.required),
      "email" : new FormControl(null,[Validators.required,Validators.email]),
      "contactNumber" : new FormControl(null,[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      "loginId" : new FormControl(null,Validators.required),
      "password" : new FormControl(null,Validators.required),
      "confirmpassword" : new FormControl(null,Validators.required)
    });
  }

  signupinApp(){
    this.userInfo = this.signupForm.value as UserInfo
    console.log(this.userInfo);

    this.loginService.registerinApp(this.userInfo).subscribe({
      next: (result) => {
        this.signupResponse = result as BaseResponse<UserInfoResponse>;
        console.log(this.signupResponse);
        if(this.signupResponse.isSuccess){
          this.route.navigate(['']);
          this.toastr.success(this.signupResponse.result.responseMessage,"User Registration");          
        }else{
          this.toastr.error(this.signupResponse.errorInfo,`User Registration - HTTP CODE - ${this.signupResponse.httpStatusCode}`);
        }
      },
      error : (err) => {
        this.signupResponse = err.error as BaseResponse<UserInfoResponse>;        
        this.toastr.error(this.signupResponse.errorInfo,`User Registration - HTTP CODE - ${this.signupResponse.httpStatusCode}`);
      }
    })
    
  }

  validatePassword(){
    this.isPasswordValid = this.signupForm.value.confirmpassword == this.signupForm.value.password;
  }

}
