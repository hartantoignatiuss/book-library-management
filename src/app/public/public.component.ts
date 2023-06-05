import { AuthService } from 'src/app/auth/auth.service';
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
  isLoginAdmin:boolean=false;

  constructor(private AuthService:AuthService){

  }

  ngOnInit(){
    if(this.AuthService.checkAuthIsAvalaibleOrExpired() === true){
      this.isLoginAdmin = true;
    }

  }

}
