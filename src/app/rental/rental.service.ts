import { Injectable } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Book } from './../books/books.model';
import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'rental.json';

  isCreate: boolean = true;
  errorHandling = new Subject<any>();

  //book
  books: Book[] = [];
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description:''};
  //rental
  rentals: Rental[] = [];
  rental: Rental = { id: '', isReturn: 0, memberId: '', bookId: '', date: ''};

  constructor(private http: HttpClient, private AuthService: AuthService) { }
  
  ngOnInit() {}

  create(rentalData: Rental) {
    return this.http
      .post(this.URL, rentalData, {
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

  getRentals() {
    return this.http
      .get(this.URL, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          const rentals: Rental[] = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key].isDelete !== 1
            ) {
              rentals.push({ ...responseData[key], id: key });
            }
          }
          this.rentals = rentals;
          return rentals;
        })
      );
  }

  getRentalById(id: string) {
    return this.http
      .get(this.URL, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          for (const key in responseData) {
            if (key === id && responseData[key].isDelete === 0) {
              this.rental = {
                id: key,
                isReturn: responseData[key].isReturn,
                memberId: responseData[key].userId,
                bookId: responseData[key].bookId,
                date: responseData[key].date
              };
            }
          }
          return this.rental;
        })
      );
  }

  getMembers() {
    return this.http
      .get(this.endPointURL + 'member.json', {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          const rentals: Rental[] = [];
          for (const key in responseData) {
            if (
              responseData.hasOwnProperty(key) &&
              responseData[key].isDelete !== 1
            ) {
              rentals.push({ ...responseData[key], id: key });
            }
          }
          this.rentals = rentals;
          return rentals;
        })
      );
  }

  getBooks() {
    return this.http
    .get(this.endPointURL + 'books.json',{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    }).pipe(
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
}
