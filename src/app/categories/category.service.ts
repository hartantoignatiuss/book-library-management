import { AuthService } from './../auth/auth.service';
import { UserService } from './../user/user.service';
import { User } from './../auth/user.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Category } from './category.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'category.json';
  category: Category = { id: '', name: '', isDelete: 0 };
  categories: Category[] = [];
  isCreate: boolean = true;
  errorHandling = new Subject<any>();
  constructor(private http: HttpClient, private AuthService: AuthService) {}

  ngOnInit() {}

  create(categoryData: Category) {
    return this.http
      .post(this.URL, categoryData, {
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

  getCategories() {
    return this.http
      .get(this.URL, {
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

  setCategory(categoryData: Category) {
    this.category = categoryData;
  }

  setIsCreateValue(status: boolean) {
    this.isCreate = status;
  }

  setFormValue(categoryData: Category) {
    this.category = categoryData;
  }

  getCategoryById(id: string) {
    return this.http
      .get(this.URL, {
        params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
      })
      .pipe(
        map((responseData: any) => {
          for (const key in responseData) {
            if (key === id && responseData[key].isDelete === 0) {
              this.category = {
                id: key,
                name: responseData[key].name,
                isDelete: responseData[key].isDelete,
              };
            }
          }
          return this.category;
        })
      );
  }
}
