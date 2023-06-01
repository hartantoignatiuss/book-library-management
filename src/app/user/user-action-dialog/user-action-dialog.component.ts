import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionDialog } from 'src/app/ActionDialog.model';

@Component({
  selector: 'app-user-action-dialog',
  templateUrl: './user-action-dialog.component.html',
  styleUrls: ['./user-action-dialog.component.css']
})
export class UserActionDialogComponent {
  message: string = '';
  isBack: boolean = true;
  additional_messages:string[]=[];
  constructor(
    public dialogRef: MatDialogRef<UserActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActionDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = this.data.message;
    this.isBack = this.data.isBack

    if(this.data.additional_message !== undefined){
      this.additional_messages = this.data.additional_message
    }
  }

  onBackToRackPage() {
    this.closeDialog();
    this.router.navigate(['admin','users']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
