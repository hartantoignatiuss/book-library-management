import { AuthGuard } from './auth/auth.guard';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RouterModule } from '@angular/router';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { RackFormComponent } from './racks/rack-form/rack-form.component';
import { RacksMainComponent } from './racks/racks-main/racks-main.component';
import { LoaderComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { RackDeleteDialogComponent } from './racks/rack-delete-dialog/rack-delete-dialog.component';
import { RackActionDialogComponent } from './racks/rack-action-dialog/rack-action-dialog.component';
import { CategoriesMainComponent } from './categories/categories-main/categories-main.component';
import { CategoryActionDialogComponent } from './categories/category-action-dialog/category-action-dialog.component';
import { CategoryDeleteDialogComponent } from './categories/category-delete-dialog/category-delete-dialog.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { LoginActionDialogComponent } from './login/login-action-dialog/login-action-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { BooksMainComponent } from './books/books-main/books-main.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { BooksActionDialogComponent } from './books/books-action-dialog/books-action-dialog.component';
import { BooksDeleteDialogComponent } from './books/books-delete-dialog/books-delete-dialog.component';
import { MemberMainComponent } from './member/member-main/member-main.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { MemberActionDialogComponent } from './member/member-action-dialog/member-action-dialog.component';
import { MemberNonactiveDialogComponent } from './member/member-nonactive-dialog/member-nonactive-dialog.component';
import { PaddingPipe } from './pipe/padding.pipe';
import { UserActionDialogComponent } from './user/user-action-dialog/user-action-dialog.component';
import { MatButtonModule} from '@angular/material/button';
import { MainComponent } from './main/main.component';
import { PublicComponent } from './public/public.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ShortenPipe } from './pipe/shorten.pipe';
import { LoginGuard } from './auth/login.guard';
import { PublicBooksDetailComponent } from './public/public-books-detail/public-books-detail.component';
import { PublicBookComponent } from './public/public-book/public-book.component';
import { PublicBookItemComponent } from './public/public-book-item/public-book-item.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RentalFormComponent } from './rental/rental-form/rental-form.component';
import { RentalMainComponent } from './rental/rental-main/rental-main.component';
import { RentalActionDialogComponent } from './rental/rental-action-dialog/rental-action-dialog.component';
import { RentalReturnDialogComponent } from './rental/rental-return-dialog/rental-return-dialog.component';
import { RentalBookLandingComponent } from './rental/rental-book-landing/rental-book-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    CategoryFormComponent,
    RackFormComponent,
    RacksMainComponent,
    LoaderComponent,
    NavbarComponent,
    RackDeleteDialogComponent,
    RackActionDialogComponent,
    CategoriesMainComponent,
    CategoryActionDialogComponent,
    CategoryDeleteDialogComponent,
    UserMainComponent,
    UserFormComponent,
    LoginComponent,
    LoginActionDialogComponent,
    AdminComponent,
    BooksMainComponent,
    BooksFormComponent,
    BooksActionDialogComponent,
    BooksDeleteDialogComponent,
    AdminComponent,
    MemberMainComponent,
    MemberFormComponent,
    MemberActionDialogComponent,
    MemberNonactiveDialogComponent,
    PaddingPipe,
    UserActionDialogComponent,
    MainComponent,
    PublicComponent,
    ShortenPipe,
    PublicBooksDetailComponent,
    PublicBookComponent,
    PublicBookItemComponent,
    NotFoundComponent,
    RentalMainComponent,
    RentalFormComponent,
    RentalActionDialogComponent,
    RentalReturnDialogComponent,
    RentalBookLandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass : AuthInterceptorService,
    multi: true
  },
  AuthGuard,
  LoginGuard,
],
  bootstrap: [AppComponent]
})
export class AppModule {}
