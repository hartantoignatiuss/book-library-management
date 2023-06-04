import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
      if(this.authService.checkAuthIsAvalaibleOrExpired() === false){
        this.router.navigate(['login']);
        return false;
      }
      else{
        return true;
      }


      // if(this.authService.getAuthToken() === undefined){
      //    this.router.navigate(['login']);
      //    return false;
      // }
      // else{
      //   return true;
      // }
        // return this.authService.userSubject.pipe(
        //     take(1),
        //     map( user => {
        //         // return !!user;
        //         const isAuth = !!user;
        //         if(isAuth)
        //             return true;
        //       return this.router.createUrlTree(['/auth']);
        //     })
            // ,
            // tap( isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);
            //     }
            // })
        // );
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      // console.log('a');
      if(this.authService.getAuthToken() === undefined){
        // console.log('masuk sini');
         this.router.navigate(['login']);
         return false;
      }
      else{
        return true;
      }
        // return this.authService.userSubject.pipe(
        //     take(1),
        //     map( user => {
        //         // return !!user;
        //         const isAuth = !!user;
        //         if(isAuth)
        //             return true;
        //       return this.router.createUrlTree(['/auth']);
        //     })
            // ,
            // tap( isAuth => {
            //     if(!isAuth){
            //         this.router.navigate(['/auth']);
            //     }
            // })
        // );
    }
  }
