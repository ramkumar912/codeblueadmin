

import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../../common/popup/popup.component'
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-staff-close-edit',
  templateUrl: './staff-close-edit.component.html',
  styleUrls: ['./staff-close-edit.component.scss']
})
export class StaffCloseEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  assign_date: any;
  staffcloseForm: any;
  get_id: any = '';
  staffleaveForm: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  get_data: any = '';
  staff_dropdown: any;
  patient_dropdown: any;
  end_date: any = '';
  todate: any = '';
  fromdate: any = '';
  tempdate: any = '';
  stime:any='';
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  urlsafe: any;
  downloadexcel: boolean = false;
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }

  constructor(private activatedRoute: ActivatedRoute,private atp: AmazingTimePickerService, private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.staffcloseForm = FormGroup;
  }

  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loader = true;
    let fromval:any;

    this.server.get("staffduty/" + val).then((data: any) => {
      this.loader = false;;
      if (data.status == 200) {
        console.log(data.result.data)

        this.get_data = data.result.data
        console.log(this.get_data.staff_uid)
 
        fromval=this.get_data.end_date;
        this.tempdate=this.get_data.end_date;
        let startdateval2 = fromval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = '0' + startdateval2[1];
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        this.end_date = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.fromdate)

        this.staffcloseForm.patchValue({
          staffid: this.get_data.staff_uid,
          patientid: this.get_data.patient_uid,
          assign_date:this.get_data.assign_date,
          end_date:this.end_date,
          stime:this.get_data.stime
        });

      } else if (data.status == 400) {
   
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
   
        this.success_modal.error_closemodal(data);
      }
    })
    this.staffcloseForm = this.formBuilder.group({
      staffid: [''],
      patientid: [''],
      assign_date: [''],
      end_date: ['', Validators.required],
      remarks: [''],
      stime:['',Validators.required]

    })
  }

  
  //==
  open(val:any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time_val => {
   // alert(time_val);
  
  let time_return = this.time_calc(time_val)
 // alert(time_return);
     this.staffcloseForm.patchValue({     
      stime:time_return,
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
  onDateChanged(event: any) {
    if (this.todate == null) {
      console.log("event---->", event)

      this.end_date = null;


      // let dateselected = event.singleDate.date;

    } else {
      let dateselected = event.singleDate?.date;
      this.todateval = dateselected?.year + "-" + dateselected?.month + "-" + dateselected?.day;
      let temp = this.todateval.split("-");
      let tempday = '';
      let tempmonth = '';

      if (temp[2].length == 1) {
        tempday = "0" + temp[2];
      } else {
        tempday = temp[2];
      }
      if (temp[1].length == 1) {
        tempmonth = "0" + temp[1];
      } else {
        tempmonth = temp[1];
      }
      this.todateval = tempday + "-" + tempmonth + "-" + temp[0];
    }
  }
  display(temp: any) {
    if (temp == 'CL') {
      this.router.navigateByUrl('staff-close');
    } else if (temp == 'REST') {
      this.fromdate = '';
      this.todate = '';
    }
  }
  staffclose(val: any) {
    this.isSubmitted = true;
 
  if(this.todateval==''){
    this.todateval=this.tempdate;
  }
  // alert(this.tempdate)
    if (this.staffcloseForm.valid) {
      let senddata = {
        id: this.get_id,
        end_date: this.todateval,
        stime:this.stime,
        isclosed:1
      }

      this.loader = true;
      this.server.post("staffduty/closeduty", senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)
        if (data.status == 200) {
          this.loader = false;
          data.result.type = 'CL';
          this.success_modal.textsuccessmodal(data.result)
        } else if (data.status == 400) {
          this.loader = false;
          this.success_modal.error_closemodal(data);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'CL';
          this.success_modal.error_closemodal(data);
        }
        else if (data.status == 401) {
          this.loader = false;
          this.success_modal.error_closemodal(data);
        }
      })
    } else {
      alert("error");
    }
  }
}
