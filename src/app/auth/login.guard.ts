import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      // console.log('disin',this.authService.checkAuthIsAvalaibleOrExpired());
      // if(this.authService.checkAuthIsAvalaibleOrExpired() === true){
      //    this.router.navigate(['admin','books']);
      //    return false;
      // }
      // else{
      //   return true;
      // }

      return true;
    }

  }
