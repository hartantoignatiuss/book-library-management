import { Component } from '@angular/core';
import { BooksService } from '../books/books.service';
import { Book } from '../books/books.model';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {
  tiles= [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  isLoading =true;

  books:Book[]=[];


  constructor(private BookService:BooksService){
    this.BookService.getBooks()
    .subscribe((response:Book[])=>{

      this.books = response;
      this.isLoading = false;
    })

  }
}
