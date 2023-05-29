import { ActionDialog } from './../../ActionDialog.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-category-action-dialog',
  templateUrl: './category-action-dialog.component.html',
  styleUrls: ['./category-action-dialog.component.css']
})
export class CategoryActionDialogComponent {
  message: string = '';
  isBack: boolean = true;
  additional_messages:string[]=[];
  constructor(
    public dialogRef: MatDialogRef<CategoryActionDialogComponent>,
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
    this.router.navigate(['admin','categories']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
