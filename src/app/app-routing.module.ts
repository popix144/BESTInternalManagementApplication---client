import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { EventManagementComponent } from './components/event-management/event-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { RegisterComponent } from './components/register/register.component';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';
import { ChangeInterestCategoryComponent } from './components/change-interest-category/change-interest-category.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventDetails', component: EventDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sendNotification', component: SendNotificationComponent },
  { path: 'manageAccount', component: ManageAccountComponent},
  { path: 'changeInterest', component: ChangeInterestCategoryComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'users', component: UserManagementComponent },
    { path: 'events', component: EventManagementComponent },
    { path: 'categories', component: CategoryManagementComponent },
    { path: '', redirectTo: 'users', pathMatch: "full" }
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }