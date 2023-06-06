import { BooksService } from '../books.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../books.model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-books-delete-dialog',
  templateUrl: './books-delete-dialog.component.html',
  styleUrls: ['./books-delete-dialog.component.css']
})
export class BooksDeleteDialogComponent {
  book:Book;
  isLoading:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<BooksDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private BooksService:BooksService,
  ) {}

  ngOnInit(){
    this.book = this.data;
  }
  onCloseDialog(){
    this.dialogRef.close();
  }

  onDeleteRack(){
    this.isLoading= true;
    const rackData = {
      [this.book.id!] :{
        name : this.book.name,
        isDelete : 1,
        bookpic: this.book.bookpic,
        category: this.book.category,
        rack: this.book.rack,
        stock: this.book.stock,
      }
    }

    this.BooksService.update(rackData).subscribe((response)=>{
      this.isLoading= false;
      this.dialogRef.close();
    })
  }
}
