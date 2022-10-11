import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from 'src/app/models/base-response.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  loginResponse: BaseResponse<LoginResponse>;
  constructor(private loginService: LoginService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem(environment.tokenKeyName) != null) {
      this.route.navigate(['/tweets/home']);
    }

    this.loginForm = new UntypedFormGroup({
      "username": new UntypedFormControl(null, Validators.required),
      "password": new UntypedFormControl(null, Validators.required)
    });
  }

  loginToApp() {
    this.loginService.logintoApp(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: res => {
        this.loginResponse = res as BaseResponse<LoginResponse>;        
        if (this.loginResponse.isSuccess) {
          localStorage.setItem(environment.tokenKeyName, this.loginResponse.result.bearerToken);
          this.toastr.success(this.loginResponse.result.loginMessage, "Login");
          this.route.navigate(['/tweets/home']);
        } else {
          this.toastr.error(this.loginResponse.errorInfo, "Login");
        }
      },
      error: err => {
        this.loginResponse = err.error as BaseResponse<LoginResponse>;
        this.toastr.error(this.loginResponse.errorInfo, `Login HTTP CODE - ${this.loginResponse.httpStatusCode}`);
      }
    });    
  }

}
