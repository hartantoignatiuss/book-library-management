import { Book } from './../../books/books.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-public-book-item',
  templateUrl: './public-book-item.component.html',
  styleUrls: ['./public-book-item.component.css']
})
export class PublicBookItemComponent {
  @Input() book:Book;

  constructor(){
  }
}
