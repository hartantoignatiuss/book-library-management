import { ActionDialog } from './../../ActionDialog.model';
import { CategoryActionDialogComponent } from './../category-action-dialog/category-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDeleteDialogComponent } from '../category-delete-dialog/category-delete-dialog.component';
import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Category } from './../category.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-main',
  templateUrl: './categories-main.component.html',
  styleUrls: ['./categories-main.component.css'],
})
export class CategoriesMainComponent {
  isLoading: boolean = true;
  categories: Category[] = [];

  constructor(
    private CategoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.CategoryService.getCategories()
    .subscribe((categories: Category[]) => {
      this.categories = categories;
      this.isLoading = false;
    }
    ,(error)=>{
      console.log(error);
      this.isLoading = false;
      const errorMessage = 'Error Code :'+error.status + ' '+ error.statusText;
      const actionDialogData:ActionDialog = {
        'message' :'Fail to Get Category Data',
        'additional_message' : [errorMessage],
        'isBack' : false,
      };
      const dialogRef = this.dialog.open(CategoryActionDialogComponent, {
        data: actionDialogData,
      });
    });
  }

  onClickCreateButton() {
    this.router.navigate(['admin','categories', 'create']);
  }

  onClickEdit(category: Category) {
    this.router.navigate(['admin','categories', category.id, 'edit']);
  }

  onClickDelete(category: Category) {
    const dialogRef = this.dialog.open(CategoryDeleteDialogComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.CategoryService.getCategories().subscribe(
        (categories: Category[]) => {
          this.categories = categories;
          this.isLoading = false;
        }
      );
    });
  }
}
