import { Component } from '@angular/core';
import { ActionDialog } from './../../ActionDialog.model';
import { RentalActionDialogComponent } from './../rental-action-dialog/rental-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RentalReturnDialogComponent } from './../rental-return-dialog/rental-return-dialog.component';
import { Router } from '@angular/router';
import { Rental } from './../rental.model';
import { RentalService } from './../rental.service';
import { Book } from './../../books/books.model';
import { BooksService } from 'src/app/books/books.service';


@Component({
  selector: 'app-rental-main',
  templateUrl: './rental-main.component.html',
  styleUrls: ['./rental-main.component.css']
})
export class RentalMainComponent {
  isLoading: boolean = true;
  rentals: Rental[] = [];
  books: Book[] = [];

  constructor(
    private RentalService: RentalService,
    private BooksService: BooksService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.RentalService.getRentals()
    .subscribe((rental: Rental[]) => {
      this.rentals = rental;
      this.isLoading = false;
    }
    ,(error)=>{
      console.log(error);
      this.isLoading = false;
      const errorMessage = 'Error Code :' + error.status + ' ' + error.statusText;
      const actionDialogData:ActionDialog = {
        'message' :'Fail to Get Rental Data',
        'additional_message' : [errorMessage],
        'isBack' : false,
      };
      const dialogRef = this.dialog.open(RentalActionDialogComponent, {
        data: actionDialogData,
      });
    });

    // this.BooksService.getBooks()
    // .subscribe((books: Book[]) => {
    //   this.books = books;
    //   this.isLoading = false;
    // }
    // ,(error)=>{
    //   console.log(error);
    //   this.isLoading = false;
    //   const errorMessage = 'Error Code :' + error.status + ' ' + error.statusText;
    //   const actionDialogData:ActionDialog = {
    //     'message' :'Fail to Get Rental Data',
    //     'additional_message' : [errorMessage],
    //     'isBack' : false,
    //   };
    //   const dialogRef = this.dialog.open(RentalActionDialogComponent, {
    //     data: actionDialogData,
    //   });
    // });
  }

  onClickCreateButton() {
    this.router.navigate(['admin','rental', 'avail']);
  }

  onClickEdit(rental: Rental) {
    this.router.navigate(['admin','rental', rental.id, 'edit']);
  }

  onClickDelete(rental: Rental) {
    const dialogRef = this.dialog.open(RentalReturnDialogComponent, {
      data: rental,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.RentalService.getRentals().subscribe(
        (rentals: Rental[]) => {
          this.rentals = rentals;
          this.isLoading = false;
        }
      );
    });
  }
}
