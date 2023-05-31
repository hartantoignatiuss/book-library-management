import { Injectable } from '@angular/core';
import { Member } from './member.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  endPointURL: string =
  'https://book-library-management-b46f2-default-rtdb.asia-southeast1.firebasedatabase.app/';
URL: string = this.endPointURL + 'member.json';
member: Member = { id: '',memberId:'', name: '', typeIndentity:'',identityId:'',address: '',gender:''};
members: Member[] = [];
isCreate: boolean = true;
errorHandling = new Subject<any>();
constructor(private http: HttpClient, private AuthService: AuthService) {}

ngOnInit() {}

create(memberData: Member) {
  console.log(memberData);
  return this.http
    .post(this.URL, memberData, {
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

getMembers() {
  return this.http
    .get(this.URL, {
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    })
    .pipe(
      map((responseData: any) => {
        const members: Member[] = [];
        for (const key in responseData) {
          if (
            responseData.hasOwnProperty(key) &&
            responseData[key].isDelete !== 1
          ) {
            members.push({ ...responseData[key], id: key });
          }
        }
        this.members = members;
        return members;
      })
    );
}

setmember(memberData: Member) {
  this.member = memberData;
}


setFormValue(memberData: Member) {
  this.member = memberData;
}

getmemberById(id: string) {
  // let member:member = this.categories.find(i => i.id === id) || ;
  // return member;

  // console.log(this, this.categories);
  return this.http
    .get(this.URL, {
      params: new HttpParams().set('auth', this.AuthService.getAuthToken()),
    })
    .pipe(
      map((responseData: any) => {
        for (const key in responseData) {
          if (key === id ) {
            this.member = {
              id: key,
              memberId:responseData[key].memberId,
              name : responseData[key].name,
              typeIndentity:responseData[key].typeIndentity,
              identityId:responseData[key].identityId,
              address: responseData[key].address,
              gender:responseData[key].gender
            };
          }
        }
        return this.member;
      })
    );
}
}

