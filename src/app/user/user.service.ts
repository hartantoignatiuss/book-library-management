
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Admin } from './admin.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'admin.json';
  users: Admin[] = [];
  user: Admin = { id: '', name: '',  email:'',isActive:true};
  isCreate: boolean = true;
  constructor(private http: HttpClient,private AuthService: AuthService) { }

  createAdmin(admin:Admin) {
    return this.http.post(this.URL, admin,{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    })
    .pipe(
      map((reponseData) => {
        return reponseData;
      })
    );


  }

  getUserNew(){
   const urls = 'https://identitytoolkit.googleapis.com/v1/projects/';
    const projectID = 'book-library-management-b46f2';
    const authKey: string = 'AIzaSyBbnO0AKhQIqlUEIHThXRcx72VGsUjBIb0';
    const createAuthUrl: string = urls+projectID+'/accounts:batchGet'+ '?key=' + authKey;

    return this.http.get(createAuthUrl).pipe(map(response=>{
      console.log(response)
    }));
  }

  getUsers() {
    return this.http.get(this.URL,{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    }).pipe(
      map((responseData: any) => {
        const users: Admin[] = [];
        for (const key in responseData) {
          if (
            responseData.hasOwnProperty(key) &&
            responseData[key].isDelete !== 1
          ) {
            users.push({ ...responseData[key], id: key });
          }
        }
        this.users = users;
        return users;
      })
    );
  }
}
