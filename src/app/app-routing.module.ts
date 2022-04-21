import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//redirectTo: 'menu/home',
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'scheduled',
    loadChildren: () => import('./scheduled/scheduled.module').then( m => m.ScheduledPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'show-outflows',
    loadChildren: () => import('./show-outflows/show-outflows.module').then( m => m.ShowOutflowsPageModule)
  },
  {
    path: 'show-incomes',
    loadChildren: () => import('./show-incomes/show-incomes.module').then( m => m.ShowIncomesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'edit-scheduled',
    loadChildren: () => import('./edit-scheduled/edit-scheduled.module').then( m => m.EditScheduledPageModule)
  },
  {
    path: 'editing-scheduled',
    loadChildren: () => import('./editing-scheduled/editing-scheduled.module').then( m => m.EditingScheduledPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
