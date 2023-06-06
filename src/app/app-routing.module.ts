import { NotFoundComponent } from './not-found/not-found.component';
import { PublicBookComponent } from './public/public-book/public-book.component';
import { PublicBooksDetailComponent } from './public/public-books-detail/public-books-detail.component';
import { LoginGuard } from './auth/login.guard';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { CategoriesMainComponent } from './categories/categories-main/categories-main.component';
import { RacksMainComponent } from './racks/racks-main/racks-main.component';
import { RackFormComponent } from './racks/rack-form/rack-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BooksMainComponent } from './books/books-main/books-main.component';
import { BooksFormComponent } from './books/books-form/books-form.component';
import { MemberMainComponent } from './member/member-main/member-main.component';
import { MemberFormComponent } from './member/member-form/member-form.component';
import { PublicComponent } from './public/public.component';

const appRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: PublicBookComponent },
      { path: ':id/view', component: PublicBooksDetailComponent },
    ],
  },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            component: BooksMainComponent,
          },
          {
            path: 'create',
            component: BooksFormComponent,
          },
          {
            path: ':id/edit',
            component: BooksFormComponent,
          },
        ],
      },
      {
        path: 'racks',
        children: [
          {
            path: '',
            component: RacksMainComponent,
          },
          {
            path: 'create',
            component: RackFormComponent,
          },
          {
            path: ':id/edit',
            component: RackFormComponent,
          },
        ],
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            component: CategoriesMainComponent,
          },
          {
            path: 'create',
            component: CategoryFormComponent,
          },
          {
            path: ':id/edit',
            component: CategoryFormComponent,
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UserMainComponent,
          },
          {
            path: 'create',
            component: UserFormComponent,
          },
        ],
      },
      {
        path: 'member',
        children: [
          {
            path: '',
            component: MemberMainComponent,
          },
          {
            path: 'create',
            component: MemberFormComponent,
          },
          {
            path: ':id/edit',
            component: MemberFormComponent,
          },
        ],
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
