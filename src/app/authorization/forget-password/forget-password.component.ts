import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  formtitle:string='Change Password';
  password : string = null;
  forgetPasswordForm : UntypedFormGroup;
  isPasswordValid : boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.forgetPasswordForm = new UntypedFormGroup({
      "newpassword" : new UntypedFormControl(null,Validators.required),
      "confirmpassword" : new UntypedFormControl(null,[Validators.required,Validators.maxLength(144)])      
    });
  }

  changePassword(){
    this.password = this.forgetPasswordForm.value.newpassword;
  }

  validatePassword(){
    this.isPasswordValid = this.forgetPasswordForm.value.confirmpassword == this.forgetPasswordForm.value.newpassword;
  }
}
