import { RackActionDialogComponent } from './../rack-action-dialog/rack-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, map } from 'rxjs';
import { RackService } from './../rack.service';
import {
  Component
} from '@angular/core';
import { Rack } from '../rack.model';
import {
  FormGroup,
  FormControl,
  Validators,  
} from '@angular/forms';

@Component({
  selector: 'app-rack-form',
  templateUrl: './rack-form.component.html',
  styleUrls: ['./rack-form.component.css'],
})
export class RackFormComponent {                 
  rack: Rack = { id: '', name: '', location: '', isDelete: 0 };
  rackDataWillUpdated: Rack = { id: '', name: '', location: '', isDelete: 0 };
  rackForm!: FormGroup;
  isLoading: boolean = true;
  isCreate: boolean = true;
  existRacks: Rack[] = [];

  constructor(
    private RackService: RackService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.rackForm = new FormGroup({
      rack_name: new FormControl('', [Validators.required,this.checkRackNameIsExist.bind(this)]),
      location: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.RackService.getRacks()
    .subscribe(response=>{
      this.existRacks = response;
    });

    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      this.isLoading = false;
    } else {
      this.isCreate = false;
      this.RackService.getRackByID(this.route.snapshot.params['id']).subscribe(
        (responseData) => {
          this.rackDataWillUpdated =responseData;
          this.rackForm = new FormGroup({
            rack_name: new FormControl(responseData.name,  [Validators.required,this.checkRackNameIsExist.bind(this)]),
            location: new FormControl(responseData.location,Validators.required),
          });
          this.isLoading = false;
        }
      );
    }
  }

  checkRackNameIsExist(control: FormGroup): null |{[s:string]:boolean} {
    const rackName = control.value;
    
    if(this.rackDataWillUpdated.name !== '' && this.rackDataWillUpdated.name==rackName){
      return null;
    }

    const isExist = this.existRacks.some(existRack => String(existRack.name) === String(rackName));

    if(isExist === true){
      return{'nameIsExist': isExist};
     } else{
      return null;
     }
  }

  createRack(rack: Rack) {
    this.RackService.create(rack)
    .subscribe((response) => {
        this.isLoading = false;

        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Success Create Rack ' + rack.name,
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Fail Create Rack ' + rack.name + '. Please try again',
            isBack: false,
          },
        });
      }
    );
  }

  updateRack(rack: Rack) {
    const id = this.route.snapshot.params['id'];
    const data = {
      [id]: rack,
    };
    this.RackService.update(data)
    .subscribe((response) => {
      this.isLoading =false;
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Succes Edit Racks ' + rack.name,
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Fail Create Rack ' + rack.name + '. Please try again',
            isBack: false,
          },
        });
      }
    );
  }

  onSubmit() {
    this.isLoading = true;
    const rack: Rack = {
      name: this.rackForm.value.rack_name,
      location: this.rackForm.value.location,
      isDelete: 0,
    };

    if (this.isCreate === true) {
      this.createRack(rack);
    } else {
      this.updateRack(rack);
    }
  }
}
