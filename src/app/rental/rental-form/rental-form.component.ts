import { RentalActionDialogComponent } from './../rental-action-dialog/rental-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Observable, map, forkJoin } from 'rxjs';
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
  styleUrls: ['./rental-form.component.css']
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
    private BooksService: BooksService,
    private RentalService: RentalService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
      this.rentalForm = new FormGroup({
        // memberId: new FormControl('',Validators.required),
        // memberName: new FormControl('',Validators.required),
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
      forkJoin([this.RentalService.getMembers()]).subscribe(([responseMembers]) =>{
        const members: Member[] = responseMembers;
        this.members = members;
        console.log("cari ini0 :" + members);

        this.BooksService.getBookById(this.route.snapshot.params['id']).subscribe(
          (responseData) => {
            this.rentalForm = new FormGroup({
              // memberId: new FormControl(responseData.name),
              // memberName: new FormControl(members),
  
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

  onSubmit() {
    this.isLoading=true;

  //   const book: Book = {
  //     name: this.bookForm.value.book_name,
  //     isDelete: 0,
  //     bookpic: this.bookForm.value.bookpic,
  //     category: this.getCategoryID(this.categories,this.bookForm.value.category),
  //     rack: this.getRackID(this.racks,this.bookForm.value.rack),
  //     stock: this.bookForm.value.stock,
  //     description : this.bookForm.value.description
  //   };

  //   const id = this.BooksService.book.id!;
  //   const data = {
  //     [id]: book,
  //   };
  //   this.BooksService.update(data)
  //   .subscribe((response) => {
  //     this.dialog.open(BooksActionDialogComponent, {
  //       data: {
  //         message: 'Succes Edit ' + book.name,
  //         isBack: true,
  //       },
  //     });
  //   },
  //   (error) => {
  //     this.isLoading = false;
  //     this.dialog.open(BooksActionDialogComponent, {
  //       data: {
  //         message: 'Fail Create Book. Please try again',
  //         isBack: false,
  //       },
  //     });
  //   });
  }

}
