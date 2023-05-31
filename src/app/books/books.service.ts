import { AuthService } from './../auth/auth.service';



import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Book } from './books.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'books.json';
  book: Book = { id: '', name: '', isDelete: 0 };
  books: Book[] = [];
  isCreate: boolean = true;
  errorHandling = new Subject<any>();
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

  setBook(bookData: Book) {
    this.book = bookData;
  }

  setIsCreateValue(status: boolean) {
    this.isCreate = status;
  }

  setFormValue(bookData: Book) {
    this.book = bookData;
  }

  getBookById(id: string) {
    // let category:Category = this.categories.find(i => i.id === id) || ;
    // return category;

    console.log(this, this.books);
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
              };
            }
          }
          return this.book;
        })
      );
  }
}
