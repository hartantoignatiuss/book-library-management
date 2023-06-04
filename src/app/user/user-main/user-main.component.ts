import { Component } from '@angular/core';
import { Admin } from '../admin.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent {
  isLoading:boolean=false;
  admin:Admin[]= [];

  constructor(
    private UserService:UserService,
    private router:Router,
    private dialog:MatDialog
  ){

  }


  ngOnInit(){
    this.UserService.getUsers().subscribe((admins:Admin[])=>{
      this.admin =admins;
      this.isLoading =false;
    });
  }

  onClickCreateButton(){
    this.router.navigate(['admin','users','create'])
    // this.passingDataOut.emit('created');
  }

  onDelete(admin:Admin){
    
  }
}
