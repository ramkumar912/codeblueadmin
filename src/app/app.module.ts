import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { StaffComponent } from './module/staff/staff.component';
import { PatientComponent } from './module/patient/patient.component';
import { StaffmanagmentComponent } from './module/staffmanagment/staffmanagment.component';
import { StaffexpenseComponent } from './module/staffexpense/staffexpense.component';
import { ContentComponent } from './common/content/content.component';
import { StaffEditComponent } from './module/staff/staff-edit/staff-edit.component';
import { StaffAddComponent } from './module/staff/staff-add/staff-add.component';
import { PatientAddComponent } from './module/patient/patient-add/patient-add.component';
import { PatientEditComponent } from './module/patient/patient-edit/patient-edit.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffViewComponent } from './module/staff/staff-view/staff-view.component';
import { StaffAssignComponent } from './module/staffmanagment/staff-assign/staff-assign.component';
import { StaffManagementDashboardComponent } from './module/staffmanagment/staff-management-dashboard/staff-management-dashboard.component';
import { StaffLeaveComponent } from './module/staffmanagment/staff-leave/staff-leave.component';
import { StaffSalarayComponent } from './module/staffmanagment/staff-salaray/staff-salaray.component';
import { StaffCloseComponent } from './module/staffmanagment/staff-close/staff-close.component';
import { StaffLeaveAddComponent } from './module/staffmanagment/staff-leave/staff-leave-add/staff-leave-add.component';
import { StaffSalaryAddComponent } from './module/staffmanagment/staff-salaray/staff-salary-add/staff-salary-add.component';
import { StaffCloseAddComponent } from './module/staffmanagment/staff-close/staff-close-add/staff-close-add.component';
import { StaffExpenseAddComponent } from './module/staffexpense/staff-expense-add/staff-expense-add.component';
import { CoreComponent } from './core/core.component';
import { PopupComponent } from './common/popup/popup.component';
import { LoaderComponent } from './common/loader/loader.component';
import { HttpServiceService } from './core/http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {ConnectionService} from 'ng-connection-service';
import { CordinatorComponent } from './cordinator/cordinator.component';
import { CordAddComponent } from './cordinator/cord-add/cord-add.component';
import { CordEditComponent } from './cordinator/cord-edit/cord-edit.component';
import { CordViewComponent } from './cordinator/cord-view/cord-view.component';
import { StaffExpenseEditComponent } from './module/staffexpense/staff-expense-edit/staff-expense-edit.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { StaffSalaryEditComponent } from './module/staffmanagment/staff-salaray/staff-salary-edit/staff-salary-edit.component';
import { StaffLeaveEditComponent } from './module/staffmanagment/staff-leave/staff-leave-edit/staff-leave-edit.component';
import { StaffCloseEditComponent } from './module/staffmanagment/staff-close/staff-close-edit/staff-close-edit.component';
import moment from 'moment';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { StaffAssignEditComponent } from './module/staffmanagment/staff-assign/staff-assign-edit/staff-assign-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    StaffComponent,
    PatientComponent,
    StaffmanagmentComponent,
    StaffexpenseComponent,
    ContentComponent,
    StaffEditComponent,
    StaffAddComponent,
    PatientAddComponent,
    PatientEditComponent,
    StaffViewComponent,
    StaffAssignComponent,
    StaffManagementDashboardComponent,
    StaffLeaveComponent,
    StaffSalarayComponent,
    StaffCloseComponent,
    StaffLeaveAddComponent,
    StaffSalaryAddComponent,
    StaffCloseAddComponent,
    StaffExpenseAddComponent,
    CoreComponent,
    PopupComponent,
    LoaderComponent,
    CordinatorComponent,
    CordAddComponent,
    CordEditComponent,
    CordViewComponent,
    StaffExpenseEditComponent,
    ChangepasswordComponent,
    StaffSalaryEditComponent,
    StaffLeaveEditComponent,
    StaffCloseEditComponent,
    StaffAssignEditComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    AngularMyDatePickerModule,
    NgxPaginationModule,
    AmazingTimePickerModule, 
    AppRoutingModule, HttpClientModule,
    HttpModule,SelectDropDownModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
