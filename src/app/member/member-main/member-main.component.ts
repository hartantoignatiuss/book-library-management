import { Component } from '@angular/core';
import { ActionDialog } from 'src/app/ActionDialog.model';
import { Member } from '../member.model';
import { MemberService } from '../member.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberActionDialogComponent } from '../member-action-dialog/member-action-dialog.component';
import { MemberNonactiveDialogComponent } from '../member-nonactive-dialog/member-nonactive-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-main',
  templateUrl: './member-main.component.html',
  styleUrls: ['./member-main.component.css']
})
export class MemberMainComponent {
  isLoading: boolean = true;
  members: Member[] = [];

  constructor(
    private MemberService: MemberService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.MemberService.getMembers()
    .subscribe((members: Member[]) => {
      this.members = members;
      this.isLoading = false;
    }
    ,(error)=>{
      console.log(error);
      this.isLoading = false;
      const errorMessage = 'Error Code :'+error.status + ' '+ error.statusText;
      const actionDialogData:ActionDialog = {
        'message' :'Fail to Get Member Data',
        'additional_message' : [errorMessage],
        'isBack' : false,
      };
      const dialogRef = this.dialog.open(MemberActionDialogComponent, {
        data: actionDialogData,
      });
    });
  }

  onClickCreateButton() {
    this.router.navigate(['admin','member', 'create']);
  }

  onClickEdit(Member: Member) {
    this.router.navigate(['admin','member', Member.id, 'edit']);
  }

  onClickDelete(members: Member) {
    const dialogRef = this.dialog.open(MemberNonactiveDialogComponent, {
      data: members,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true;
      this.MemberService.getMembers().subscribe(
        (members: Member[]) => {
          this.members = members;
          this.isLoading = false;
        }
      );
    });
  }
}
