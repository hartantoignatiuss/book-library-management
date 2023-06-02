import { AuthRequestData, AuthService } from './../../auth/auth.service';
import { UserService } from './../user.service';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
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
  userExist :Admin[]=[];


  constructor(
    private UserService: UserService,
    private AuthService: AuthService,
    private dialog: MatDialog
  ){}

  ngOnInit(){
    this.isLoading = true;

    this.UserService.getUsers()
    .subscribe((response)=>{
      this.userExist = response;
      this.isLoading = false;
    });

    this.userForm = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,this.checkEmailIsExist.bind(this)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.checkPasswordAndConfirmationIsMatch as ValidatorFn });

    this.userForm.get('password')?.valueChanges.subscribe(() => {
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  checkEmailIsExist(control: FormGroup): null |{[s:string]:boolean} {
    const email = control.value;
    
    const isExist = this.userExist.some(existRack => String(existRack.email) === String(email));

    if(isExist === true){
      return{'emailIsExist': isExist};
     } else{
      return null;
     }
  }

  checkPasswordAndConfirmationIsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }

  getControlValue(controlName: string): any {
    if (this.userForm && this.userForm.get(controlName)) {
      return this.userForm.get(controlName)?.value;
    }
    return null;
  }

  onSubmit(){
    console.log(this.userForm);
    // const createAuthUserData: AuthRequestData = {
    //   email:this.userForm.value.email,
    //   password:this.userForm.value.password,
    //   returnSecureToken :false,
    // }
    // console.log(createAuthUserData);

    // this.AuthService.createAuth(createAuthUserData)
    // .subscribe(response=>{
    //   const adminData:Admin  = {
    //     name : this.userForm.value.user_name,
    //     email:this.userForm.value.email,
    //     isActive:true
    //   }
    //   this.UserService.createAdmin(adminData)
    //   .subscribe(response=>{
    //     this.isLoading = false;

    //     this.dialog.open(UserActionDialogComponent, {
    //       data: {
    //         message: 'Success Create User',
    //         isBack: true,
    //       },
    //     });
    //   });
    // });


  }
}
