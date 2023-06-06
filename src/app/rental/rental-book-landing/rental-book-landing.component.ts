import { ActionDialog } from '../../ActionDialog.model';
import { BooksActionDialogComponent } from '../../books/books-action-dialog/books-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BooksDeleteDialogComponent } from '../../books/books-delete-dialog/books-delete-dialog.component';
import { Router } from '@angular/router';
import { BooksService } from '../../books/books.service';
import { Book } from '../../books/books.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rental-book-landing',
  templateUrl: './rental-book-landing.component.html',
  styleUrls: ['./rental-book-landing.component.css']
})
export class RentalBookLandingComponent {
  isLoading: boolean = true;
  books: Book[] = [];

  constructor(
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

  onClickEdit(book: Book) {
    this.router.navigate(['admin','rental', book.id, 'edit']);
  }

  onClickDelete(book: Book) {
    const dialogRef = this.dialog.open(BooksDeleteDialogComponent, {
      data: book,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.BooksService.getBooks().subscribe(
        (books: Book[]) => {
          this.books = books;
          this.isLoading = false;
        }
      );
    });
  }
}
