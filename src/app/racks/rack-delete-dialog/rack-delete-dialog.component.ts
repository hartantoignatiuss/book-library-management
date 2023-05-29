import { Rack } from './../rack.model';
import { RackService } from './../rack.service';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rack-delete-dialog',
  templateUrl: './rack-delete-dialog.component.html',
  styleUrls: ['./rack-delete-dialog.component.css']
})
export class RackDeleteDialogComponent {
  rack:Rack;
  isLoading:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RackDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private RackService:RackService,
  ) {}

  ngOnInit(){
    this.rack = this.data;
  }

  onDeleteRack(){
    this.isLoading= true;
    const rackData = {
      [this.rack.id!] :{
        name : this.rack.name,
        location : this.rack.location,
        isDelete : 1
      }
    }

    this.RackService.update(rackData).subscribe((response)=>{
      this.isLoading= false;
      this.dialogRef.close();
    })
  }
}
