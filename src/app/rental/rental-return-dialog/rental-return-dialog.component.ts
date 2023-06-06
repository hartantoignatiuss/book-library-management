import { RentalService } from '../rental.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rental } from '../rental.model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-rental-return-dialog',
  templateUrl: './rental-return-dialog.component.html',
  styleUrls: ['./rental-return-dialog.component.css']
})
export class RentalReturnDialogComponent {
  rental:Rental;
  isLoading:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<RentalReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private rentalService:RentalService,
  ) {}

  ngOnInit(){
    this.rental = this.data;
  }
  onCloseDialog(){
    this.dialogRef.close();
  }
  
  onReturnRental(){
    this.isLoading= true;
    const rackData = {
      [this.rental.id!] :{
        isDelete : 1,
        memberId : this.rental.memberId,
        bookId: this.rental.bookId,
        date: this.rental.date
      }
    }

    this.rentalService.update(rackData).subscribe((response)=>{
      this.isLoading= false;
      this.dialogRef.close();
    })
  }
}
