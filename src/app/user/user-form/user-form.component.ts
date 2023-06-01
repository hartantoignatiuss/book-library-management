import { AuthRequestData, AuthService } from './../../auth/auth.service';
import { UserService } from './../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { formatPercent } from '@angular/common';
import { Admin } from '../admin.model';
import { MatDialog } from '@angular/material/dialog';
import { UserActionDialogComponent } from '../user-action-dialog/user-action-dialog.component';

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
    private AuthService: AuthService,
    private dialog: MatDialog
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
    const createAuthUserData: AuthRequestData = {
      email:this.userForm.value.email,
      password:this.userForm.value.password,
      returnSecureToken :false,
    }
    console.log(createAuthUserData);

    this.AuthService.createAuth(createAuthUserData)
    .subscribe(response=>{
      const adminData:Admin  = {
        name : this.userForm.value.user_name,
        email:this.userForm.value.email,
        isActive:true
      }
      this.UserService.createAdmin(adminData)
      .subscribe(response=>{
        this.isLoading = false;

        this.dialog.open(UserActionDialogComponent, {
          data: {
            message: 'Success Create User',
            isBack: true,
          },
        });
      });
    });


  }
}
