import { AuthService } from './../auth/auth.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Rack } from './rack.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RackService {
  endPointURL: string =
    'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
  URL: string = this.endPointURL + 'rack.json';
  errorHandling = new Subject<any>();
  racks: Rack[] = [];
  rack: Rack = { id: '', name: '', location: '', isDelete: 0 };
  isCreate: boolean = true;

  constructor(private http: HttpClient,private AuthService: AuthService) {

  }

  create(rack: Rack) {
    return this.http.post(this.URL, rack,{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    })
    .pipe(
      map((reponseData) => {
        return reponseData;
      })
    );
  }

  getRacks() {
    return this.http.get(this.URL,{
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

  setIsCreateValue(status: boolean) {
    this.isCreate = status;
  }

  setFormValue(rack: Rack) {
    this.rack = rack;
  }

  update(data: any) {
    console.log(data);
    return this.http.patch(this.URL, data,{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    }).pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  getRackByID(id: any) {
    return this.http.get(this.URL,{
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    }).pipe(
      map((responseData: any) => {
        for (const key in responseData) {
          if (key === id && responseData[key].isDelete === 0) {
            this.rack = {
              id: key,
              name: responseData[key].name,
              location: responseData[key].location,
              isDelete: responseData[key].isDelete,
            };
          }
        }
        return this.rack;
      })
    );
  }

  checkRackNameIsExist(rack_name: any) {
    return this.http.get(this.URL).pipe(
      map((responseData: any) => {
        for (const key in responseData) {
          if (responseData[key].name === rack_name) {
            return true;
          }
        }
        return false;
      })
    );
  }
}
