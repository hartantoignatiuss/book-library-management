import { CategoryActionDialogComponent } from '../category-action-dialog/category-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Rack } from './../../racks/rack.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './../category.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { Category } from '../category.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  categoryForm!: FormGroup;
  isCreate: boolean = true;
  isLoading: boolean = true;
  existCategories: Category[] = [];
  categoryDataWillUpdated:Category ={id: '',name : '', isDelete : 0};
  constructor(
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.categoryForm = new FormGroup({
      category_name: new FormControl('', [Validators.required,this.checkCategoriesNameIsExist.bind(this)]),
    });
  }

  ngOnInit() {
    const getExistCategory = this.CategoryService.getCategories();
    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      this.isLoading = false;

      getExistCategory.subscribe(response => {
        this.existCategories = response;
      })
    }
    else {
      this.isCreate = false;
      const getCategoryByID = this.CategoryService.getCategoryById(this.route.snapshot.params['id']);

      forkJoin([getExistCategory, getCategoryByID]).subscribe(
        ([responseExistCategory, responseCategory]) => {
          this.existCategories = responseExistCategory;
          this.categoryDataWillUpdated = responseCategory;
          if(responseCategory.id !== ''){
            this.categoryForm = new FormGroup({
              category_name: new FormControl(responseCategory.name,[Validators.required,this.checkCategoriesNameIsExist.bind(this)]),
            });
          }
          else{
            this.dialog.open(CategoryActionDialogComponent, {
              data: {
                message: 'Category data not found',
                isBack: true,
              },
            });
          }

          this.isLoading = false;
        }
      )
    }
  }

  checkCategoriesNameIsExist(control: FormGroup): null |{[s:string]:boolean} {
    const categoryName = control.value;

    if(this.categoryDataWillUpdated.name !== '' && this.categoryDataWillUpdated.name==categoryName){
      return null;
    }

    const isExist = this.existCategories.some(existCategories => String(existCategories.name) === String(categoryName));

    if(isExist === true){
      return{'nameIsExist': isExist};
     } else{
      return null;
     }

  }

  createCategory(category: Category) {
    this.CategoryService.create(category)
      .subscribe((response) => {
        this.isLoading = false;

        this.dialog.open(CategoryActionDialogComponent, {
          data: {
            message: 'Success Create Category' + category.name,
            isBack: true,
          },
        });
      },
        (error) => {
          this.isLoading = false;
          this.dialog.open(CategoryActionDialogComponent, {
            data: {
              message: 'Fail Create Category' + category.name + '. Please try again',
              isBack: false,
            },
          });
        });
  }

  updateCategory(category: Category) {
    const id = this.CategoryService.category.id!;
    const data = {
      [id]: category,
    };
    this.CategoryService.update(data)
      .subscribe((response) => {
        this.dialog.open(CategoryActionDialogComponent, {
          data: {
            message: 'Succes Edit Category ' + category.name,
            isBack: true,
          },
        });
      },
        (error) => {
          this.isLoading = false;
          this.dialog.open(CategoryActionDialogComponent, {
            data: {
              message: 'Fail Create Category ' + category.name + '. Please try again',
              isBack: false,
            },
          });
        });
  }

  onSubmit() {
    this.isLoading = true;

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
