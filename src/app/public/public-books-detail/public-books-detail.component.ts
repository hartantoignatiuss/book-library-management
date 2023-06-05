import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoryService } from './../../categories/category.service';
import { RackService } from './../../racks/rack.service';
import { BooksService } from './../../books/books.service';
import { Book } from './../../books/books.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-books-detail',
  templateUrl: './public-books-detail.component.html',
  styleUrls: ['./public-books-detail.component.css'],
})
export class PublicBooksDetailComponent {
  book: Book = {
    id: '',
    categoryDesc: '',
    rackDesc: '',
    isDelete: 0,
    name: '',
    bookpic: '',
    category: '',
    rack: '',
    stock: -1,
    description: '',
  };

  isLoading: boolean = true;

  constructor(
    private BookService: BooksService,
    private RackService: RackService,
    private CategoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const book_id = this.route.snapshot.params['id'];

    const getRacks = this.RackService.getRacks();
    const getCategories = this.CategoryService.getCategories();

    forkJoin([getRacks, getCategories]).subscribe(
      ([responseRacks, ResponseCategories]) => {
        const racks = responseRacks;
        const categories = ResponseCategories;
        this.BookService.getBooks().subscribe((response: Book[]) => {
          const books: Book = {
            id: '',
            categoryDesc: '',
            rackDesc: '',
            isDelete: 0,
            name: '',
            bookpic: '',
            category: '',
            rack: '',
            stock: -1,
            description: '',
          };
          response.forEach((book) => {
            if (book.id === book_id) {
              const rackDesc =
                racks.find((rack) => rack.id === book.rack)?.name || '{}';
              const categoryDesc =
                categories.find((category) => category.id === book.category)
                  ?.name || '{}';

              this.book = book;
              this.book.rackDesc = rackDesc;
              this.book.categoryDesc = categoryDesc;
            }
          });
          this.isLoading = false;
        });
      }
    );
  }
}
