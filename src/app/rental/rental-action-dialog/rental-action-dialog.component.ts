import { ActionDialog } from './../../ActionDialog.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-rental-action-dialog',
  templateUrl: './rental-action-dialog.component.html',
  styleUrls: ['./rental-action-dialog.component.css']
})
export class RentalActionDialogComponent {
  message: string = '';
  isBack: boolean = true;
  additional_messages:string[]=[];
  constructor(
    public dialogRef: MatDialogRef<RentalActionDialogComponent>,
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
    this.router.navigate(['admin','rental']);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
