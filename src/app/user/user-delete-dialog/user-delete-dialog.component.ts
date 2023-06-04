import { Component, Inject } from '@angular/core';
import { Admin } from '../admin.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css']
})
export class UserDeleteDialogComponent {
  user:Admin;
  isLoading:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private UserService:UserService,
    private AuthService:AuthService
  ){}

  onDeleteUser(){
    this.user = this.data;

    // const rackData = {
    //   [this.book.id!] :{
    //     name : this.book.name,
    //     isDelete : 1,
    //     bookpic: this.book.bookpic,
    //     category: this.book.category,
    //     rack: this.book.rack,
    //     stock: this.book.stock,
    //   }
  }
}
