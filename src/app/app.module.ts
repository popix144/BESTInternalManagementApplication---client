import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule,
  MatSidenavModule, MatExpansionModule, MatListModule, MatTableModule,
  MatPaginatorModule, MatCardModule, MatDividerModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatProgressBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSlideToggleModule, MatSelectModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PreauthenticateService } from './services/preauthenticate.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminComponent } from './components/admin/admin.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { EventManagementComponent } from './components/event-management/event-management.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { AddCategoryDialogComponent } from './components/add-category-dialog/add-category-dialog.component';
import { EditEventInfoDialogComponent } from './components/edit-event-info-dialog/edit-event-info-dialog.component';
import { EditEventMainOrganizerDialogComponent } from './components/edit-event-main-organizer-dialog/edit-event-main-organizer-dialog.component';
import { EditEventCoreTeamDialogComponent } from './components/edit-event-core-team-dialog/edit-event-core-team-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUpdateDialogComponent } from './components/add-update-dialog/add-update-dialog.component';
import { SendNotificationComponent } from './components/send-notification/send-notification.component';
import { ConfirmUsersDialogComponent } from './components/confirm-users-dialog/confirm-users-dialog.component';
import { ManageAccountComponent } from './components/manage-account/manage-account.component';
import { ChangeInterestCategoryComponent } from './components/change-interest-category/change-interest-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent,
    EventDetailsComponent,
    AdminComponent,
    UserManagementComponent,
    EventManagementComponent,
    EditUserDialogComponent,
    CategoryManagementComponent,
    AddCategoryDialogComponent,
    EditEventInfoDialogComponent,
    EditEventMainOrganizerDialogComponent,
    EditEventCoreTeamDialogComponent,
    RegisterComponent,
    AddUpdateDialogComponent,
    SendNotificationComponent,
    ConfirmUsersDialogComponent,
    ManageAccountComponent,
    ChangeInterestCategoryComponent
  ],
  entryComponents: [
    EditUserDialogComponent,
    AddCategoryDialogComponent,
    EditEventInfoDialogComponent,
    EditEventCoreTeamDialogComponent,
    EditEventMainOrganizerDialogComponent,
    AddUpdateDialogComponent,
    ConfirmUsersDialogComponent
  ],
  imports: [
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: check_token,
      deps: [PreauthenticateService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function check_token(preauthenticateService: PreauthenticateService) {
  return () => preauthenticateService.checkToken();
}