import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CordinatorComponent } from './cordinator/cordinator.component';
import { StaffComponent } from './module/staff/staff.component';
import { PatientComponent } from './module/patient/patient.component';
import { StaffmanagmentComponent } from './module/staffmanagment/staffmanagment.component';
import { StaffexpenseComponent } from './module/staffexpense/staffexpense.component';
import { StaffEditComponent } from './module/staff/staff-edit/staff-edit.component';
import { StaffAddComponent } from './module/staff/staff-add/staff-add.component';
import { PatientAddComponent } from './module/patient/patient-add/patient-add.component';
import { PatientEditComponent } from './module/patient/patient-edit/patient-edit.component';
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
import { CordAddComponent } from './cordinator/cord-add/cord-add.component';
import { CordEditComponent } from './cordinator/cord-edit/cord-edit.component';
import { CordViewComponent } from './cordinator/cord-view/cord-view.component';
import { StaffExpenseEditComponent } from './module/staffexpense/staff-expense-edit/staff-expense-edit.component';
import { StaffSalaryEditComponent } from './module/staffmanagment/staff-salaray/staff-salary-edit/staff-salary-edit.component';
import { ChangepasswordComponent } from './common/changepassword/changepassword.component';
import { StaffLeaveEditComponent } from './module/staffmanagment/staff-leave/staff-leave-edit/staff-leave-edit.component';
import { StaffCloseEditComponent } from './module/staffmanagment/staff-close/staff-close-edit/staff-close-edit.component';
import { StaffAssignEditComponent } from './module/staffmanagment/staff-assign/staff-assign-edit/staff-assign-edit.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cordinator', component: CordinatorComponent },
  { path: 'cord-add', component: CordAddComponent },
  { path: 'cord-edit/:id', component: CordEditComponent },
  { path: 'cord-view/:id', component: CordViewComponent },



  
  { path: 'staff', component: StaffComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'staff-dashboard', component: StaffManagementDashboardComponent },

  { path: 'staff-managment', component: StaffmanagmentComponent },
  { path: 'staff-expense', component: StaffexpenseComponent },
  { path: 'staff-expense-add', component: StaffExpenseAddComponent },
  { path: 'staff-expense-edit/:id', component: StaffExpenseEditComponent },



  
  { path: 'staff-edit/:id', component: StaffEditComponent },
  { path: 'staff-add', component: StaffAddComponent },
  { path: 'staff-view/:id', component: StaffViewComponent },


  { path: 'patient-edit/:id', component: PatientEditComponent },
  { path: 'patient-add', component: PatientAddComponent },


  { path: 'staff-assign', component: StaffAssignComponent },
  { path: 'staff-assign-edit/:id', component: StaffAssignEditComponent },

  { path: 'staff-leave', component: StaffLeaveComponent },
  { path: 'staff-leave-add/:id', component: StaffLeaveAddComponent },
  { path: 'staff-leave-edit/:id', component: StaffLeaveEditComponent },

  { path: 'staff-salary', component: StaffSalarayComponent },
  { path: 'staff-salary-add/:id', component: StaffSalaryAddComponent },
  { path: 'staff-salary-edit/:id', component: StaffSalaryEditComponent },


  { path: 'staff-close', component: StaffCloseComponent },
  { path: 'staff-close-add/:id', component: StaffCloseAddComponent },
  { path: 'staff-close-edit/:id', component: StaffCloseEditComponent },

 



];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
