import { RackDeleteDialogComponent } from '../rack-delete-dialog/rack-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RackService } from './../rack.service';
import { Rack } from '../rack.model';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-racks-main',
  templateUrl: './racks-main.component.html',
  styleUrls: ['./racks-main.component.css']
})
export class RacksMainComponent {
  isLoading:boolean=true;
  racks:Rack[]= [];

  constructor(
    private RackService:RackService,
    private router:Router,
    private dialog:MatDialog
    ){}

  ngOnInit(){
    this.RackService.getRacks().subscribe((racks:Rack[])=>{
      this.racks =racks;
      this.isLoading =false;
    });
  }

  onClickCreateButton(){
    this.router.navigate(['admin','racks','create'])
    // this.passingDataOut.emit('created');
  }

  onClickEdit(rack:Rack){
    this.router.navigate(['admin','racks',rack.id,'edit']);
  }

  onClickDelete(rackData:Rack){
    const dialogRef = this.dialog.open(RackDeleteDialogComponent, {
      data:rackData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.RackService.getRacks().subscribe((racks:Rack[])=>{
        this.racks =racks;
        this.isLoading =false;
      });
    });
  }

}
