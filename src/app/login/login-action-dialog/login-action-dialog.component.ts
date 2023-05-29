import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-action-dialog',
  templateUrl: './login-action-dialog.component.html',
  styleUrls: ['./login-action-dialog.component.css']
})
export class LoginActionDialogComponent {
  message:string ='';

  constructor(
    public dialogRef: MatDialogRef<LoginActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; isBack: boolean }
    ){}

    ngOnInit(){
      this.message =this.data.message;
    }
  closeDialog(){
    this.dialogRef.close();
  }
}
