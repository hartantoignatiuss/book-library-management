import { RentalService } from './../rental.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BooksService } from './../../books/books.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rental } from '../rental.model';
import { Component, Inject } from '@angular/core';
import { Book } from './../../books/books.model';

@Component({
  selector: 'app-rental-return-dialog',
  templateUrl: './rental-return-dialog.component.html',
  styleUrls: ['./rental-return-dialog.component.css'],
})
export class RentalReturnDialogComponent {
  rental: Rental;
  isLoading: boolean = false;
  //books
  book: Book = {
    id: '',
    isDelete: 0,
    name: '',
    bookpic: '',
    category: '',
    rack: '',
    stock: -1,
    description: '',
  };
  books: Book[] = [];

  constructor(
    public dialogRef: MatDialogRef<RentalReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rentalService: RentalService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rental = this.data;
    this.books = this.rentalService.getterBooks();
    console.log(this.books);
  }
  onCloseDialog() {
    this.dialogRef.close();
  }

  onReturnRental() {
    this.isLoading = true;
    const rentalData = {
      [this.rental.id!]: {
        // isDelete: 0,
        isDelete : 1,
        memberId: this.rental.memberId,
        bookId: this.rental.bookId,
        date: this.rental.date,
      },
    };
    let bookData = {};
    const loopData = this.books.length;
    for (let i = 0; i < loopData; i++) {
      if (this.books[i].id === this.rental.bookId) {
        this.book = this.books[i];
        console.log('mabok: ' + this.book);
        console.log(this.book);
        bookData = this.returnBookStockAvail(this.book, this.rental.bookId);
      }
    }

    const updateBookData = this.booksService.update(bookData);
    const updateRental = this.rentalService.update(rentalData);

    forkJoin([updateBookData, updateRental]).subscribe(
      ([responseExistCategory, responseCategory]) => {
        this.isLoading = false;
        this.dialogRef.close();
        this.rentalService.reloadPage();
      }
    );
  }

  returnBookStockAvail(book: Book, bookId: string) {
    book.stock = book.stock + 1;

    const id = bookId;
    const data = {
      [id]: book,
    };
    return data;
  }
}
