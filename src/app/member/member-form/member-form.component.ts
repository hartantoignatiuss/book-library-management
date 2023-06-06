import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { Member } from '../member.model';
import { MemberService } from '../member.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MemberActionDialogComponent } from '../member-action-dialog/member-action-dialog.component';
import { PaddingPipe } from 'src/app/pipe/padding.pipe';
@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent {
  errorHandling = new Subject<any>();
  member: Member  = { id: '',memberId:'', name: '', typeIndentity:'',identityId:'',address: '',gender:''};
  memberForm!: FormGroup;
  isLoading: boolean = true;
  isCreate: boolean = true;
  genders =[
    'Male',
    'Female'
  ]

  
  constructor(
    private MemberService: MemberService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    // private paddingPipe: PaddingPipe
  ) {
    this.memberForm = new FormGroup({
      member_id:new FormControl('', [Validators.required]),
      member_name: new FormControl('', [Validators.required]),
      type_indentity : new FormControl('',Validators.required),
      identity_id: new FormControl('',Validators.required),
      address : new FormControl('',Validators.required),
      gender : new FormControl(null,Validators.required)
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.MemberService.getMembers()
      .subscribe(responseData=>{
        const paddingPipe = new PaddingPipe();
        const totalMember:number = responseData.length === 0 ? 1 : responseData.length+1;
        const memberId =  paddingPipe.transform(totalMember);
        // console.log(memberId);

        this.memberForm = new FormGroup({
          member_id:new FormControl(memberId, [Validators.required]),
          member_name: new FormControl('', [Validators.required]),
          type_indentity : new FormControl('',Validators.required),
          identity_id: new FormControl('',Validators.required),
          address : new FormControl('',Validators.required),
          gender : new FormControl(null,Validators.required)
        });

        this.isCreate = true;
        this.isLoading = false;
      });

    } else {
      this.isCreate = false;
      this.MemberService.getmemberById(this.route.snapshot.params['id']).subscribe(
        (responseData) => {
          this.memberForm.setValue({
            member_id:responseData.memberId,
            member_name: responseData.name,
            type_indentity : responseData.typeIndentity,
            identity_id: responseData.identityId,
            address : responseData.address,
            gender : responseData.gender
          });
        
          this.isLoading = false;
        }
      );
    }
  }

  // checkmemberNameIsExist(control: FormGroup): Observable<any | null> {
  //   return this.MemberService.checkmemberNameIsExist(control.value.member_name).pipe(
  //     map((result: boolean) => {
  //       if (result === true) {
  //         return { memberNameIsExist: true };
  //       } else {
  //         return null;
  //       }
  //     })
  //   );
  // }

  createmember(member: Member) {
    this.MemberService.create(member)
    .subscribe((response) => {
        this.isLoading = false;

        this.dialog.open(MemberActionDialogComponent, {
          data: {
            message: 'Success Create Member ' + member.name,
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(MemberActionDialogComponent, {
          data: {
            message: 'Fail Create member ' + member.name + '. Please try again',
            isBack: false,
          },
        });
      }
    );
  }

  updatemember(member: Member) {
    const id = this.route.snapshot.params['id'];
    const data = {
      [id]: member,
    };
    this.MemberService.update(data)
    .subscribe((response) => {
        this.dialog.open(MemberActionDialogComponent, {
          data: {
            message: 'Success Edit members ' + member.name,
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(MemberActionDialogComponent, {
          data: {
            message: 'Fail Create member ' + member.name + '. Please try again',
            isBack: false,
          },
        });
      }
    );
  }

  onSubmit() {
    console.log(this.memberForm);
    this.isLoading = true;
    const member: Member = {
      name: this.memberForm.value.member_name,
      memberId:this.memberForm.value.member_id,
      typeIndentity:this.memberForm.value.type_indentity,
      identityId:this.memberForm.value.identity_id,
      address: this.memberForm.value.address,
      gender:this.memberForm.value.gender,
    };

    console.log(member);
    if (this.isCreate === true) {
      this.createmember(member);
    } else {
      this.updatemember(member);
    }
  }
}
