import { LoginActionDialogComponent } from './login-action-dialog/login-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { AuthService, AuthRequestData } from './../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.isLoading = true;
    const authRequestData: AuthRequestData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true,
    };

    this.AuthService.login(authRequestData).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['admin','books']);
      },
      (error) => {
        this.isLoading = false;
        this.dialog.open(LoginActionDialogComponent, {
          data: {
            message: error,
            isBack: true,
          },
        });
      }
    );
  }
}
