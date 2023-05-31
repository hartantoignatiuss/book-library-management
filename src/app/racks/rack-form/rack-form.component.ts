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
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-rack-form',
  templateUrl: './rack-form.component.html',
  styleUrls: ['./rack-form.component.css'],
})
export class RackFormComponent {
  errorHandling = new Subject<any>();
  rack: Rack = { id: '', name: '', location: '', isDelete: 0 };
  rackForm!: FormGroup;
  isLoading: boolean = true;
  isCreate: boolean = true;

  constructor(
    private RackService: RackService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.rackForm = new FormGroup({
      rack_name: new FormControl('', [Validators.required]),
      location: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === undefined) {
      this.isCreate = true;
      this.isLoading = false;
    } else {
      this.isCreate = false;
      this.RackService.getRackByID(this.route.snapshot.params['id']).subscribe(
        (responseData) => {
          this.rackForm = new FormGroup({
            rack_name: new FormControl(responseData.name),
            location: new FormControl(responseData.location),
          });
          this.isLoading = false;
        }
      );
    }
  }

  checkRackNameIsExist(control: FormGroup): Observable<any | null> {
    return this.RackService.checkRackNameIsExist(control.value.rack_name).pipe(
      map((result: boolean) => {
        if (result === true) {
          return { rackNameIsExist: true };
        } else {
          return null;
        }
      })
    );
  }

  createRack(rack: Rack) {
    this.RackService.create(rack)
    .subscribe((response) => {
        this.isLoading = false;

        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Success Create Rack',
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Fail Create Rack. Please try again',
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
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Succes Edit Racks',
            isBack: true,
          },
        });
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(RackActionDialogComponent, {
          data: {
            message: 'Fail Create Rack. Please try again',
            isBack: false,
          },
        });
      }
    );
  }

  onSubmit() {
    console.log(this.rackForm);
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
