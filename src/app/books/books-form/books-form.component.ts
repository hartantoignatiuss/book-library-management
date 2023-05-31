import { BooksActionDialogComponent } from '../books-action-dialog/books-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Observable, map } from 'rxjs';
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
  errorHandling = new Subject<any>();
  bookForm!: FormGroup;
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 };
  isCreate: boolean = true;
  isLoading: boolean = true;

  constructor(
    private BooksService: BooksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.bookForm = new FormGroup({
      book_name: new FormControl('',Validators.required),
      bookpic: new FormControl(''),
      category: new FormControl('',Validators.required),
      rack: new FormControl('',Validators.required),
      stock: new FormControl('',Validators.required),
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
            bookpic: new FormControl(responseData.bookpic),
            category: new FormControl(responseData.category),
            rack: new FormControl(responseData.rack),
            stock: new FormControl(responseData.stock),
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
          message: 'Success Create Book ' + book.name,
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Fail Create Book' + book.name + '. Please try again',
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
          message: 'Succes Edit ' + book.name,
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
      bookpic: "null",//this.bookForm.value.bookpic,
      category: this.bookForm.value.category,
      rack: this.bookForm.value.rack,
      stock: this.bookForm.value.stock,
    };

    if (this.isCreate === true) {
      this.createBook(book);
    } else {
      this.updateBook(book);

    }
  }
}
