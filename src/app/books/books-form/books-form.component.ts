import { BooksActionDialogComponent } from '../books-action-dialog/books-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { BooksService } from './../books.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { Book } from '../books.model';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent {
  bookForm!: FormGroup;
  isCreate: boolean = true;
  isLoading: boolean = true;

  constructor(
    private BooksService: BooksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.bookForm = new FormGroup({
      book_name: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      this.isLoading = false;
    }
    else {
      this.isCreate = false;
      this.BooksService.getBookById(this.route.snapshot.params['id']).subscribe(
        (responseData) => {
          this.bookForm = new FormGroup({
            book_name: new FormControl(responseData.name),
          });
          this.isLoading = false;
        }
      );
    }
  }


  createBook(book:Book){
    this.BooksService.create(book)
    .subscribe((response) => {
      this.isLoading = false;

      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Success Create Book',
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Fail Create Book. Please try again',
          isBack: false,
        },
      });
    });
  }

  updateBook(book:Book){
    const id = this.BooksService.book.id!;
    const data = {
      [id]: book,
    };
    this.BooksService.update(data)
    .subscribe((response) => {
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Succes Edit Book',
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Fail Create Book. Please try again',
          isBack: false,
        },
      });
    });
  }

  onSubmit() {
    this.isLoading=true;

    const book: Book = {
      name: this.bookForm.value.book_name,
      isDelete: 0,
    };

    if (this.isCreate === true) {
      this.createBook(book);
    } else {
      this.updateBook(book);

    }
  }
}
