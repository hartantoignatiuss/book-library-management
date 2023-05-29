import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rack-action-dialog',
  templateUrl: './rack-action-dialog.component.html',
  styleUrls: ['./rack-action-dialog.component.css'],
})
export class RackActionDialogComponent {
  message: string = '';
  isBack: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<RackActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; isBack: boolean },
    private router: Router
  ) {}

  ngOnInit() {
    this.message = this.data.message;
    this.isBack = this.data.isBack;
  }


  onBackToRackPage() {
    this.closeDialog();
    this.router.navigate(['admin','racks']);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
