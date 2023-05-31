import { ActionDialog } from './../../ActionDialog.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksDeleteDialogComponent } from '../books-delete-dialog/books-delete-dialog.component';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-books-action-dialog',
  templateUrl: './books-action-dialog.component.html',
  styleUrls: ['./books-action-dialog.component.css']
})
export class BooksActionDialogComponent {
  message: string = '';
  isBack: boolean = true;
  additional_messages:string[]=[];
  constructor(
    public dialogRef: MatDialogRef<BooksActionDialogComponent>,
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
    this.router.navigate(['admin','books']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
