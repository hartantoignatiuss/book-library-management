import { Component } from '@angular/core';
import { ActionDialog } from './../../ActionDialog.model';
import { RentalActionDialogComponent } from './../rental-action-dialog/rental-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RentalReturnDialogComponent } from './../rental-return-dialog/rental-return-dialog.component';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { Rental } from './../rental.model';
import { RentalService } from './../rental.service';
import { Book } from './../../books/books.model';
import { BooksService } from 'src/app/books/books.service';
import { Member } from 'src/app/member/member.model';


@Component({
  selector: 'app-rental-main',
  templateUrl: './rental-main.component.html',
  styleUrls: ['./rental-main.component.css']
})
export class RentalMainComponent {
  isLoading: boolean = true;
  rentals: Rental[] = [];
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description : ''};
  books: Book[] = [];
  //member
  member: Member = { id: '', memberId: '', name: '', typeIndentity: '', identityId: '', address: '', gender: ''};
  members: Member[] = [];

  constructor(
    private RentalService: RentalService,
    private BooksService: BooksService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getAllRentalData();
  }

  getAllRentalData(){
    forkJoin([this.BooksService.getBooks(), this.RentalService.getMembers()]).subscribe(([responseBooks, responseMembers]) =>{
      const members: Member[] = responseMembers;
      this.members = members;
      const books: Book[] = responseBooks;
      this.books = books;
      this.RentalService.setterBooks(books);

      this.RentalService.getRentals()
      .subscribe((rental: Rental[]) => {
        this.isLoading = false;
        const loop = rental.length;

        for(let i=0;i<loop;i++){
          this.book = this.getBookData(rental[i].bookId);

          rental[i].bookCover = this.book.bookpic + "";
          rental[i].rentalLabel = this.getMemberData(rental[i].memberId).name + " - " + this.book.name;
        }
        this.rentals = rental;
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

    });
  }

  onClickCreateButton() {
    this.router.navigate(['admin','rental', 'avail']);
  }

  onClickDelete(rental: Rental) {

    const dialogRef = this.dialog.open(RentalReturnDialogComponent, {
      data: rental,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.RentalService.getRentals().subscribe(
        (rentals: Rental[]) => {
          this.getAllRentalData();
          this.isLoading = false;
        }
      );
    });
  }

  getBookData(bookID:string){
    const loopLength = this.books.length;
    let book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description : ''};

    for(let i=0;i<loopLength;i++){
      if(this.books[i].id === bookID){
        return this.books[i];
      }
    }
    return book;
  }

  getMemberData(memberId:string){
    const loopLength = this.members.length;
    let member: Member = { id: '', memberId: '', name: '', typeIndentity: '', identityId: '', address: '', gender: ''};

    for(let i=0;i<loopLength;i++){
      if(this.members[i].id === memberId){
        return this.members[i];
      }
    }
    return member;
  }
}
