import { CategoryActionDialogComponent } from '../category-action-dialog/category-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Rack } from './../../racks/rack.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './../category.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  categoryForm!: FormGroup;
  isCreate: boolean = true;
  isLoading: boolean = true;

  constructor(
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.categoryForm = new FormGroup({
      category_name: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      this.isLoading = false;
    }
    else {
      this.isCreate = false;
      this.CategoryService.getCategoryById(this.route.snapshot.params['id']).subscribe(
        (responseData) => {
          this.categoryForm = new FormGroup({
            category_name: new FormControl(responseData.name),
          });
          this.isLoading = false;
        }
      );
    }
  }


  createCategory(category:Category){
    this.CategoryService.create(category)
    .subscribe((response) => {
      this.isLoading = false;

      this.dialog.open(CategoryActionDialogComponent, {
        data: {
          message: 'Success Create Category',
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(CategoryActionDialogComponent, {
        data: {
          message: 'Fail Create Category. Please try again',
          isBack: false,
        },
      });
    });
  }

  updateCategory(category:Category){
    const id = this.CategoryService.category.id!;
    const data = {
      [id]: category,
    };
    this.CategoryService.update(data)
    .subscribe((response) => {
      this.dialog.open(CategoryActionDialogComponent, {
        data: {
          message: 'Succes Edit Category',
          isBack: true,
        },
      });
    },
    (error) => {
      this.isLoading = false;
      this.dialog.open(CategoryActionDialogComponent, {
        data: {
          message: 'Fail Create Category. Please try again',
          isBack: false,
        },
      });
    });
  }

  onSubmit() {
    this.isLoading=true;

    const category: Category = {
      name: this.categoryForm.value.category_name,
      isDelete: 0,
    };

    if (this.isCreate === true) {
      this.createCategory(category);
    } else {
      this.updateCategory(category);

    }
  }
}
