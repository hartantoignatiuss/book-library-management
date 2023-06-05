import { forkJoin } from 'rxjs';
import { CategoryService } from './../../categories/category.service';
import { RackService } from './../../racks/rack.service';
import { BooksService } from './../../books/books.service';
import { Book } from './../../books/books.model';
import { Rack } from './../../racks/rack.model';
import { Category } from './../../categories/category.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-book',
  templateUrl: './public-book.component.html',
  styleUrls: ['./public-book.component.css']
})
export class PublicBookComponent {

  isLoading =true;
  categories:Category[] = [];
  racks:Rack[] = [];
  books:Book[]=[];


  constructor(private BookService:BooksService,private RackService:RackService, private CategoryService:CategoryService){
    const getRacks  = this.RackService.getRacks();
    const getCategories = this.CategoryService.getCategories();

    forkJoin([getRacks,getCategories]).subscribe(([responseRacks,ResponseCategories])=>{
      const racks =responseRacks;
      const categories = ResponseCategories;
      this.BookService.getBooks()
      .subscribe((response:Book[])=>{
        const books:Book[] = [];
        response.forEach(book => {
          const racksDesc = racks.find(rack=>rack.id ===book.rack )?.name || null;
          const categoryDesc = categories.find(category=>category.id ===book.category )?.name || null;
          books.push({ ...book, rackDesc: racksDesc,categoryDesc:categoryDesc});

        });


        this.books = books;
        this.isLoading = false;
      })

    });


  }
}
