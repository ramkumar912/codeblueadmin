import { Component, OnInit, ViewChild } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../common/popup/popup.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  loader:boolean=false;
  totalstaff:any='';
  total_patient:any='';
  total_staffduty:any='';
  totalcount_expense:any='';
  constructor(private router: Router, public server: HttpServiceService) { }

  ngOnInit(): void {
    this.staff_list(0);
    this.patient_list(0);
    this.expense_list(0);
    this.staffmangement_list(0);
  }
  staffmangement_list(pagevalue:any):any{
    this.loader = true;
    this.server.post("staffduty/listdata?page=" + pagevalue + "&limit=10&orderby=id|desc", { search: ''}).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.total_staffduty = data.result.total
       
      }else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })
  }
  expense_list(pagevalue:any):any{
    this.loader = true;
    this.server.post("staffexpense/listdata?page=" + pagevalue + "&limit=10&orderby=id|desc", { search: ''}).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.totalcount_expense = data.result.total
       
      }else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })
  }
  staff_list(pagevalue: any): any {
    this.loader = true;
    this.server.post("staff/listdata?page=" + pagevalue + "&limit=10&orderby=id|desc", { search: ''}).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.totalstaff = data.result.total
       
      }else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })


  }
  patient_list(pagevalue:any){
    this.loader = true;
    this.server.post("patient/listdata?page=" + pagevalue + "&limit=10&orderby=id|desc", { search: '' }).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)     
        this.total_patient = data.result.total;
      } else if (data.status == 400) {
   
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
   
        this.success_modal.error_closemodal(data);
      }
    })
  }
}
