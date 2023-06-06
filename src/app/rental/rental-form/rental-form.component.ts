import { RentalActionDialogComponent } from './../rental-action-dialog/rental-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { RentalService } from './../rental.service';
import { BooksService } from './../../books/books.service';
import { Book } from '../../books/books.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Rental } from '../rental.model';
import { Member } from 'src/app/member/member.model';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css'],
})
export class RentalFormComponent {
  errorHandling = new Subject<any>();
  //rental
  rentalForm!: FormGroup;
  rental: Rental = { id: '', isReturn: 0, memberId: '', bookId: '', date: ''};
  //book
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description : ''};
  books: Book[] = []
  //member
  member: Member = { id: '', memberId: '', name: '', typeIndentity: '', identityId: '', address: '', gender: ''};
  members: Member[] = [];

  isLoading: boolean = true;

  constructor(
    private booksService: BooksService,
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
      this.rentalForm = new FormGroup({
        // memberId: new FormControl('',Validators.required),
        memberId: new FormControl('',Validators.required),
        // bookId: new FormControl('',Validators.required),
        bookName: new FormControl('',Validators.required),
        bookCover: new FormControl(''),
        bookStock: new FormControl('',Validators.required),
      });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.isLoading = false;
    }
    else {
      forkJoin([this.rentalService.getMembers()]).subscribe(([responseMembers]) =>{
        const members: Member[] = responseMembers;
        this.members = members;

        this.booksService.getBookById(this.route.snapshot.params['id']).subscribe(
          (responseData) => {
            this.rentalForm = new FormGroup({
              // memberId: new FormControl(responseData.name),
              // memberName: new FormControl(members,Validators.required),
              memberId: new FormControl(''),
  
              // bookId: new FormControl(responseData.name),
              // bookName: new FormControl(this.getCategoryName(responseCategories, responseData.category),Validators.required),
              bookName: new FormControl(responseData.name),
              bookCover : new FormControl(responseData.bookpic),
              bookStock : new FormControl(responseData.stock),
            });
            this.isLoading = false;
            this.book = responseData;
            console.log("cari ini :" + this.book.bookpic);
          }
        );
      } );
    }

  }

  onSubmitTest(){
    let currentDate = new Date();
    let date:String = "" + currentDate.getFullYear() 
                          + this.padTo2Digits(currentDate.getMonth()) 
                          + this.padTo2Digits(currentDate.getDate()) 
                          + this.padTo2Digits(currentDate.getHours()) 
                          + this.padTo2Digits(currentDate.getMinutes());

    console.log("Trial submit mem.id:" + this.rentalForm.value.memberId);
    console.log("Trial submit book.id:" + this.book.id);
    console.log("Trial submit book.nm:" + this.book.name);
    console.log("Trial submit :" + date);
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  onSubmit() {
    this.isLoading=true;
    
    let currentDate = new Date();
    let date:String = "" + currentDate.getFullYear() + "/"
                          + this.padTo2Digits(currentDate.getMonth()) + "/"
                          + this.padTo2Digits(currentDate.getDate()) + " "
                          + this.padTo2Digits(currentDate.getHours()) + ":"
                          + this.padTo2Digits(currentDate.getMinutes());

    const rental: Rental = {
      memberId: this.rentalForm.value.memberId,
      bookId: this.book.id + "",
      date: date + "",
      isReturn: 0,
    };

    if(this.book.stock > 0){
      this.updateBookStock(this.book);

      this.rentalService.create(rental)
      .subscribe((response) => {
        this.isLoading = false;
  
        this.dialog.open(RentalActionDialogComponent, {
          data: {
            message: 'Success Rental Book ' + this.book.name,
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(RentalActionDialogComponent, {
          data: {
            message: 'Fail Rental Book ' + this.book.name + '. Please try again',
            isBack: false,
          },
        });
      });
    }else{
      this.isLoading = false;
        this.dialog.open(RentalActionDialogComponent, {
          data: {
            message: 'No Stocks Available for Book: ' + this.book.name + '.',
            isBack: false,
          },
        });
    }
    
  }

  updateBookStock(book:Book){
    book.stock = book.stock-1;

    const id = this.booksService.book.id!;
    const data = {
      [id]: book,
    };
    this.booksService.update(data)
    .subscribe((response) => {
      console.log("book-altered");
    });
  }

}
