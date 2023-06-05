import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Book } from './books.model';
import { Category } from './../categories/category.model';
import { Rack } from './../racks/rack.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'books.json';

  isCreate: boolean = true;
  errorHandling = new Subject<any>();

  //book
  books: Book[] = [];
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description:''};
  //category
  category: Category = { id: '', name: '', isDelete: 0 };
  categories: Category[] = [];
  //rack
  racks: Rack[] = [];
  rack: Rack = { id: '', name: '', location: '', isDelete: 0 };


  constructor(private http: HttpClient, private AuthService: AuthService) {}

  ngOnInit() {}

  create(bookData: Book) {
    return this.http
      .post(this.URL, bookData, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((reponseData) => {
          return reponseData;
        })
      );
  }

  update(data: any) {
    return this.http
      .patch(this.URL, data, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  getBooks() {
    return this.http
      .get(this.URL, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          const books: Book[] = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key].isDelete !== 1
            ) {
              books.push({ ...responseData[key], id: key });
            }
          }
          this.books = books;
          return books;
        })
      );
  }

  // setBook(bookData: Book) {
  //   this.book = bookData;
  // }

  setIsCreateValue(status: boolean) {
    this.isCreate = status;
  }

  setFormValue(bookData: Book) {
    this.book = bookData;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getBookById(id: string) {
    this.delay(2200);
    return this.http
      .get(this.URL, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          for (const key in responseData) {
            if (key === id && responseData[key].isDelete === 0) {
              this.book = {
                id: key,
                name: responseData[key].name,
                isDelete: responseData[key].isDelete,
                bookpic: responseData[key].bookpic,
                category: responseData[key].category,
                rack: responseData[key].rack,
                stock: responseData[key].stock,
                description : responseData[key].description
              };
            }
          }
          return this.book;
        })
      );
  }

  getCategories() {
    return this.http
      .get(this.endPointURL + 'category.json', {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          const categories: Category[] = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key].isDelete !== 1
            ) {
              categories.push({ ...responseData[key], id: key });
            }
          }
          this.categories = categories;
          return categories;
        })
      );
  }

  getRacks() {
    return this.http
    .get(this.endPointURL + 'rack.json',{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    }).pipe(
      map((responseData: any) => {
        const racks: Rack[] = [];
        for (const key in responseData) {
          if (
            responseData.hasOwnProperty(key) &&
            responseData[key].isDelete !== 1
          ) {
            racks.push({ ...responseData[key], id: key });
          }
        }
        this.racks = racks;
        return racks;
      })
    );
  }
}
