import { forkJoin } from 'rxjs';
import { Category } from './../categories/category.model';
import { CategoryService } from './../categories/category.service';
import { RackService } from './../racks/rack.service';
import { Component } from '@angular/core';
import { BooksService } from '../books/books.service';
import { Book } from '../books/books.model';
import { Rack } from '../racks/rack.model';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent {

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
          const racksDesc = racks.find(rack=>rack.id ===book.rack )?.name || '{}';
          const categoryDesc = categories.find(category=>category.id ===book.category )?.name || '{}';
          books.push({ ...book, rackDesc: racksDesc,categoryDesc:categoryDesc});

        });


        this.books = books;
        this.isLoading = false;
      })

    });


  }
}
