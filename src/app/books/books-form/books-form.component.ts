import { BooksActionDialogComponent } from '../books-action-dialog/books-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Observable, map, forkJoin } from 'rxjs';
import { BooksService } from './../books.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Book } from '../books.model';
import { Category } from './../../categories/category.model';
import { Rack } from './../../racks/rack.model';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent {
  errorHandling = new Subject<any>();
  //book
  bookForm!: FormGroup;
  book: Book = { id: '', isDelete: 0, name: '', bookpic: '', category: '', rack: '', stock: -1 ,description : ''};
  //category
  category: Category = { id: '', name: '', isDelete: 0 };
  categories: Category[] = [];
  //rack
  racks: Rack[] = [];
  rack: Rack = { id: '', name: '', location: '', isDelete: 0 };
  isCreate: boolean = true;
  isLoading: boolean = true;

  constructor(
    private BooksService: BooksService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
      this.bookForm = new FormGroup({
        book_name: new FormControl('',Validators.required),
        bookpic: new FormControl(''),
        category: new FormControl('',Validators.required),
        rack: new FormControl('',Validators.required),
        stock: new FormControl('',Validators.required),
        description : new FormControl('',Validators.required),
      });
  }

  ngOnInit() {

    //handle create vs edit
    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      forkJoin([this.BooksService.getRacks(),this.BooksService.getCategories()]).subscribe(([responseRacks, responseCategories]) =>{
        const racks: Rack[] = responseRacks;
        const categories: Category[] = responseCategories;
        this.categories = categories;
        this.racks =racks;
      this.isLoading = false;
      });
    }
    else {
      this.isCreate = false;

      forkJoin([this.BooksService.getRacks(),this.BooksService.getCategories()]).subscribe(([responseRacks, responseCategories]) =>{
        const racks: Rack[] = responseRacks;
        const categories: Category[] = responseCategories;
        this.categories = categories;
        this.racks =racks;

        this.BooksService.getBookById(this.route.snapshot.params['id']).subscribe(
          (responseData) => {

            if(responseData.id !==''){
              this.bookForm = new FormGroup({
                book_name: new FormControl(responseData.name),
                bookpic: new FormControl(responseData.bookpic),

                category: new FormControl(this.getCategoryName(responseCategories, responseData.category)),
                rack: new FormControl(this.getRackName(responseRacks, responseData.rack)),
                stock: new FormControl(responseData.stock),
                description : new FormControl(responseData.description,Validators.required),
              });
              this.isLoading = false;
            }
            else{
              this.dialog.open(BooksActionDialogComponent, {
                data: {
                  message: 'Book not found! ',
                  isBack: true,
                },
              });
            }

            // console.log("cari ini :" + this.getRackName(this.racks, responseData.rack));
          }
        );
      } );

      // this.BooksService.getBookById(this.route.snapshot.params['id']).subscribe(
      //   (responseData) => {
      //     this.bookForm = new FormGroup({
      //       book_name: new FormControl(responseData.name),
      //       bookpic: new FormControl(responseData.bookpic),

      //       category: new FormControl(this.getCategoryName(this.categories, responseData.category)),
      //       rack: new FormControl(this.getRackName(this.racks, responseData.rack)),
      //       stock: new FormControl(responseData.stock),
      //       description : new FormControl(responseData.description,Validators.required),
      //     });
      //     this.isLoading = false;
      //     console.log("cari ini :" + this.getRackName(this.racks, responseData.rack));
      //   }
      // );
    }

  }

  ngAfterContentChecked(){
  }

  createBook(book:Book){
    this.BooksService.create(book)
    .subscribe((response) => {
      this.isLoading = false;

      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Success Create Book: ' + book.name,
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Fail Create Book' + book.name + '. Please try again',
          isBack: false,
        },
      });
    });
  }

  updateBook(book:Book){
    const id = this.BooksService.book.id!;
    const data = {
      [id]: book,
    };
    this.BooksService.update(data)
    .subscribe((response) => {
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Succes Edit Book: ' + book.name,
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(BooksActionDialogComponent, {
        data: {
          message: 'Fail Create Book ' + book.name + '. Please try again',
          isBack: false,
        },
      });
    });
  }

  onSubmit() {
    this.isLoading=true;

    const book: Book = {
      name: this.bookForm.value.book_name,
      isDelete: 0,
      bookpic: this.bookForm.value.bookpic,
      category: this.getCategoryID(this.categories,this.bookForm.value.category),
      rack: this.getRackID(this.racks,this.bookForm.value.rack),
      stock: this.bookForm.value.stock,
      description : this.bookForm.value.description
    };

    if (this.isCreate === true) {
      this.createBook(book);
    } else {
      this.updateBook(book);

    }
  }

  getCategoryName(categories: Category[], category: string){
    let categoryName: string  = 'deleted';
    let length = categories.length;
    // console.log("valueC-loaded : " + category);
    // console.log("test: " + length);

    for (let i = 0; i < length; i++) {
      if(categories[i].id?.startsWith("-")){
        // console.log("masuk sini dong");
        // console.log("cats: " + categories[i].id);
        // console.log("cats-input: " + this.formatIDnonMin(category));
        // console.log(categories[i].id?.substring(1,categories[i].id?.length));
        // console.log(this.formatID(category));
        if(categories[i].id?.substring(1,categories[i].id?.length) === this.formatID(category)){
          return categories[i].name;
        }
      } else {
        if(categories[i].id === this.formatIDnonMin(category)){
          // console.log(categories[i].id);
          return categories[i].name;
        }
      }
    }
    return categoryName;
  }

  getRackName(racks: Rack[], rack: string){
    let rackName: string  = 'deleted';
    let length = racks.length;
    // console.log("valueR-Loaded : " + rack);
    // console.log("test: " + length);

    for (let i = 0; i < length; i++) {
      if(racks[i].id?.startsWith("-")){
        // console.log("racs: " + racks[i].id?.substring(1,racks[i].id?.length));
        // console.log("racs - input: " + this.formatID(rack));
        if(racks[i].id?.substring(1,racks[i].id?.length) === this.formatID(rack)){
          // console.log(racks[i].name);
          return racks[i].name;
        }
      } else {
        if(racks[i].id === this.formatIDnonMin(rack)){
        // console.log(racks[i].id);
        return racks[i].name;
        }
      }
    }
    return rackName;
  }

  getCategoryID(categories: Category[], category: string){
    let categoryID: string = "error";
    let length = categories.length;
    // console.log("UPvalueC : " + category);
    // console.log("test: ");
    // console.log("test: " + length);

    for (let i = 0; i < length; i++) {
      //compare name
      if(categories[i].name === category){
        // console.log(categories[i].name);
        // console.log(categories[i].id);
        categoryID = categories[i].id + "";
        return categoryID;
      }
    }
    return categoryID;
  }

  getRackID(racks: Rack[], rack: string){
    let rackID: string = "error";
    let length = racks.length;
    // console.log("UPvalueR : " + rack);

    for (let i = 0; i < length; i++) {
      //compare name
      if(racks[i].name === rack){
        // console.log(racks[i].name);
        // console.log(racks[i].id);
        rackID = racks[i].id + "";
        return rackID;
      }
    }
    return rackID;
  }

  formatID(ID: string){
    if(ID!=null && ID.length>1){
      if(ID.startsWith("-")){
        ID = ID.substring(1,ID.length);
      }
    }
    return ID;
  }

  formatIDnonMin(ID: string){
    if(ID!=null && ID.length>1){
      if(!ID.startsWith("-")){
        ID = "-" + ID;
      }
    }
    return ID;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
