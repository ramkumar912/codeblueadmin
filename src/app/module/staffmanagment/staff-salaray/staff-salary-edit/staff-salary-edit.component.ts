


import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../../common/popup/popup.component'
import moment from 'moment';
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-staff-salary-edit',
  templateUrl: './staff-salary-edit.component.html',
  styleUrls: ['./staff-salary-edit.component.scss']
})
export class StaffSalaryEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;

  staffsalaryForm: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  get_id: any = '';
  get_data: any = '';
  adate: any;
  currentDate = new Date();
  fromdate: any = '';
  todate: any = '';
  end_date: any = '';
  perdaysalary: any = '';

  //days calculation
  firstdate: any;
  seconddate: any;

  myDatePickerOptions_sod: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }
  myDatePickerOptions_eod: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableUntil: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }
  constructor(private activatedRoute: ActivatedRoute, private atp: AmazingTimePickerService,private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.staffsalaryForm = FormGroup;
  }
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  todatevaltemp: any = '';
  fromdatevaltemp: any = '';
  urlsafe: any;
  downloadexcel: boolean = false;
  totaldays: any = '';
  totalsalary: any = '';
  salary_per_day:any='';
  ngOnInit(): void {

    this.staffsalaryForm = this.formBuilder.group({
      staffid: [''],
      patientid: [''],
      assign_date: [''],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
      remarks: [''],
      stime: ['', Validators.required],
      total_days: ['', Validators.required],
      salaryperday: ['', Validators.required],
      salary: ['', Validators.required],
      assign_time:['']
    })
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loader = true;
    let fromval:any;
    let toval:any;
    this.server.get("staffduty/salary/" + val).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.get_data = data.result.data
        // console.log(this.get_data.fromdate)
        fromval=this.get_data.fromdate,
        toval=this.get_data.todate,

        this.fromdatevaltemp=this.get_data.fromdate;
        this.todatevaltemp=this.get_data.todate;
        console.log(this.fromdate)


        let startdateval2 = fromval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = '0' + startdateval2[1];
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        this.fromdate = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.fromdate)
        this.firstdate = moment(startdateval2[2] + "-" + startdateval2[1] + "-" + startdateval2[0]);
        
        this.myDatePickerOptions_eod= {
          disableUntil: { year: startdateval2[2], month: startdateval2[1] , day: startdateval2[0]  }
        };


        let startdateval3 = toval.split("-");
        if (startdateval3[1] > 10) {
        } else {
          startdateval3[1] = '0' + startdateval3[1];
        }
        if (startdateval3[2] > 10) {
        } else {
          startdateval3[2] = startdateval3[2].substring(1);
        }
        this.todate = { isRange: false, singleDate: { date: { year: Number(startdateval3[2]), month: Number(startdateval3[1]), day: Number(startdateval3[0]) } } };
        console.log(this.todate)
        this.seconddate = moment(startdateval3[2] + "-" + startdateval3[1] + "-" + startdateval3[0]);
        

        this.staffsalaryForm.patchValue({
         staffid: this.get_data.staff_uid,
         patientid: this.get_data.patient_uid,
         assign_date: this.get_data.assign_date,
         assign_time:this.get_data.assign_time,       
         total_days:this.get_data.total_days,
         stime:this.get_data.stime,
         salaryperday:this.get_data.salaryperday,
         salary:this.get_data.salary,
         remarks:this.get_data.remarks,
         
        });

      } else if (data.status == 400) {
   
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
   
        this.success_modal.error_closemodal(data);
      }
    })
   
  }

  open(val:any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time_val => {
   // alert(time_val);
  
  let time_return = this.time_calc(time_val)
 // alert(time_return);
     this.staffsalaryForm.patchValue({     
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
  //==
  onFromDateChanged(event: IMyDateModel) {

    this.todate = null;
    this.staffsalaryForm.patchValue({     
      total_days:'',
      stime:'',
      salaryperday:'',
      salary:'',       
     });

    let dateselected = event.singleDate?.date;
    this.fromdateval = dateselected?.year + "-" + dateselected?.month + "-" + dateselected?.day;
    // var d = new Date(this.fromdateval);
    // var t2=d.setDate(d.getDate()-1);
    // console.log("t2-->",t2)
    let temp = this.fromdateval.split("-");
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
    var evendateval: any;
    evendateval = event.singleDate?.jsDate;
    var temp23 = new Date(evendateval);
    temp23.setDate(temp23.getDate() - 1);
    var monthvalueshown = temp23.getUTCMonth() + 1;
    var dayvalueshown = temp23.getUTCDate() + 1;
    var yearvalueshown = temp23.getUTCFullYear();
    //  console.log('monthvalueshown---->',monthvalueshown);
    //  console.log('dayvalueshown---->',dayvalueshown);
    //  console.log('yearvalueshown---->',yearvalueshown);

    this.fromdateval = tempday + "-" + tempmonth + "-" + temp[0];
    this.firstdate = new Date(temp[0], Number(tempmonth), Number(tempday));
    this.firstdate = moment(temp[0] + "-" + tempmonth + "-" + tempday);
 
    // this.myDatePickerOptions_eod= {
    //   disableUntil: { year: yearvalueshown, month: monthvalueshown, day: dayvalueshown }
    // };

  }
  //==
  onTodatechanged(event: IMyDateModel) {

      if(this.firstdate==undefined){
        this.todate= null
        alert("first select From date while using Update");

      }

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
      this.seconddate = moment(temp[0] + "-" + tempmonth + "-" + tempday);
      
      this.todatevaltemp=tempday + "-" + tempmonth + "-" + temp[0];
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays: any = Math.round(Math.abs((this.seconddate - this.firstdate) / oneDay));
     

      this.staffsalaryForm.patchValue({
        total_days: diffDays+1,
        salaryperday:'',
        salary:'',
      });
     
    

  }
  //==
  display(temp: any) {
    if (temp == 'SSE') {
      this.router.navigateByUrl('staff-salary');
    }
  }
  ontotaldays(val:any){
    this.salary_per_day='';
    this.totalsalary='';
  }
  onSalary(searchValue: any) {
    //alert(searchValue)
    this.perdaysalary = searchValue;
    if (searchValue != '' && this.totaldays!='') {
      this.totalsalary = this.totaldays * this.perdaysalary
    } else {
      alert("Total days or amount per day is empty");
      this.totalsalary='';
    }
  }
  staffsalary(val: any) {
    this.isSubmitted = true;
    console.log(val.fromdate.singleDate.formatted)

    if (this.staffsalaryForm.valid) {

      if (this.fromdateval != '') {
        this.fromdatevaltemp = this.fromdateval;
        this.todatevaltemp = this.todateval;
      }

      let senddata = {
        dutyid: this.get_id,
        fromdate: this.fromdatevaltemp,
        todate: this.todatevaltemp,
        total_days:val.total_days,
        stime:val.stime,
        salaryperday :val.salaryperday, 
        salary:this.totalsalary,
        remarks: val.remarks
      }

      this.loader = true;
      this.server.post("staffduty/salary/"+this.get_id, senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)
        if (data.status == 200) {
          this.loader = false;
          data.result.type = 'SSE';
          this.success_modal.textsuccessmodal(data.result)
        } else if (data.status == 400) {
          this.loader = false;
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'SSE';
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 401) {
          this.loader = false;
          this.success_modal.error_closemodal(data.result);
        }
      })
    } else {
      alert("error");
    }

  }
}
