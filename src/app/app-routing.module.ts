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

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { BooksMainComponent } from './books/books-main/books-main.component';
import { BooksFormComponent } from './books/books-form/books-form.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
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
      },{
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
        path: 'user',
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
    ],
  },
];

// { path: '', redirectTo: '/recipes', pathMatch: 'full' },
// {
//   path: 'recipes',
//   component: RecipesComponent,
//   canActivate: [AuthGuard],
//   children: [
//     { path: '', component: RecipeStartComponent },
//     { path: 'new', component: RecipeEditComponent },
//     {
//       path: ':id',
//       component: RecipeDetailComponent,
//       resolve: [RecipesResolverService]
//     },
//     {
//       path: ':id/edit',
//       component: RecipeEditComponent,
//       resolve: [RecipesResolverService]
//     }
//   ]
// },
// { path: 'shopping-list', component: ShoppingListComponent },
// { path: 'auth', component: AuthComponent }

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
