import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  books: Book[] = [];

  constructor(
    private RentalService: RentalService,
    private BooksService: BooksService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.BooksService.getBooks()
    .subscribe((books: Book[]) => {
      this.books = books;
      this.isLoading = false;
    }
    ,(error)=>{
      console.log(error);
      this.isLoading = false;
      const errorMessage = 'Error Code :'+error.status + ' '+ error.statusText;
      const actionDialogData:ActionDialog = {
        'message' :'Fail to Get Book Data',
        'additional_message' : [errorMessage],
        'isBack' : false,
      };
      const dialogRef = this.dialog.open(BooksActionDialogComponent, {
        data: actionDialogData,
      });
    });
  }

}
