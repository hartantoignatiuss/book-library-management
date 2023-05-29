import { AuthRequestData, AuthService } from './../../auth/auth.service';
import { UserService } from './../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { formatPercent } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isCreate:boolean=true;
  userForm!: FormGroup;
  isLoading:boolean=false;

  constructor(
    private UserService: UserService,
    private AuthService: AuthService
  ){}

  ngOnInit(){
    this.userForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      email : new  FormControl('', [Validators.required]),
      password : new  FormControl('', [Validators.required]),
      confirmPassword : new  FormControl('', [Validators.required]),
      // userType : new  FormControl('', [Validators.required]),

    });

  }

  createAdmin(){

  }

  onSubmit(){
    const email = this.userForm.value.email;
    const password = this.userForm.value.email;

    const createAuthUserData: AuthRequestData = {
      email:'superadmin@gmail.com',
      password:'test123',
      returnSecureToken :true,
    }
    console.log(createAuthUserData);

    this.AuthService.createAuth(createAuthUserData)
    .subscribe(response=>{

    });


  }
}
