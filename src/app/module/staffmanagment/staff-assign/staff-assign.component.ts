

import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component'
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-staff-assign',
  templateUrl: './staff-assign.component.html',
  styleUrls: ['./staff-assign.component.scss']
})
export class StaffAssignComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }

  staffassignForm: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  staff_dropdown: any;
  patient_dropdown: any;
  constructor(private formBuilder: FormBuilder, private atp: AmazingTimePickerService, public server: HttpServiceService, public router: Router) {
    this.staffassignForm = FormGroup;
  }
  adate: any;
  defaultMonth: IMyDefaultMonth | undefined;
  ngOnInit(): void {
    this.server.get("staffduty/stafflist").then((data: any) => {
      this.staff_dropdown = data.result.data;
    })

    this.server.get("staffduty/patientlist ").then((data: any) => {
      this.patient_dropdown = data.result.data;
    })
    this.staffassignForm = this.formBuilder.group({
      staffid: ['', Validators.required],
      patientid: ['', Validators.required],
      servicetype: ['', Validators.required],
      hourformat: ['', Validators.required],
      assign_date: ['', Validators.required],
      assign_time: ['', Validators.required],
      coordinator: ['', Validators.required],
      location:['',Validators.required],
      remarks: [''],

    })
  }

  open(val:any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time_val => {
   // alert(time_val);
  
  let time_return = this.time_calc(time_val)
 // alert(time_return);
     this.staffassignForm.patchValue({     
      assign_time:time_return,
     })
    });
  }

  time_calc(val:any){
    let time :any=val;
    time= time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    } 
    return time.join (''); // return adjusted time or original string
  }

  staffassign(val: any) {
    this.isSubmitted = true;
    console.log(val.assign_date.singleDate.formatted)

    if (this.staffassignForm.valid) {
      let senddata = {
        staffid: val.staffid,
        patientid: val.patientid,
        servicetype: val.servicetype,
        hourformat: val.hourformat,
        assign_date: val.assign_date.singleDate.formatted,
        assign_time: val.assign_time,
        coordinator: val.coordinator,
        location:val.location,
        remarks: val.remarks,
      }

      this.loader = true;
      this.server.post("staffduty", senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)
        if (data.status == 200) {
          this.loader = false;
          data.result.type = 'SD';
          this.success_modal.textsuccessmodal(data.result)
        } else if (data.status == 400) {
          this.loader = false;
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 401) {
          this.loader = false;
          this.success_modal.error_closemodal(data.result);
        }
      })
    } else{
      alert("error");
    }

  }

  display(temp: any) {
    if (temp == 'SD') {
      this.router.navigateByUrl('staff-managment');
    }
  }
}
