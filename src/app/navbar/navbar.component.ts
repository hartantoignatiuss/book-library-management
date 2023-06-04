import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar-custom',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private AuthService:AuthService,private router: Router){

  }
  onLogOut(){
    this.AuthService.logout();
    this.router.navigate(['']);


  }

}
