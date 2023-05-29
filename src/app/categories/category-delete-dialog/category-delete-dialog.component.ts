import { CategoryService } from '../category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category.model';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.css']
})
export class CategoryDeleteDialogComponent {
  category:Category;
  isLoading:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<CategoryDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private CategoryService:CategoryService,
  ) {}

  ngOnInit(){
    this.category = this.data;
  }

  onDeleteRack(){
    this.isLoading= true;
    const rackData = {
      [this.category.id!] :{
        name : this.category.name,
        isDelete : 1
      }
    }

    this.CategoryService.update(rackData).subscribe((response)=>{
      this.isLoading= false;
      this.dialogRef.close();
    })
  }
}
