
import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../../common/popup/popup.component'
import { AmazingTimePickerService } from 'amazing-time-picker';
import moment from 'moment';
@Component({
  selector: 'app-staff-assign-edit',
  templateUrl: './staff-assign-edit.component.html',
  styleUrls: ['./staff-assign-edit.component.scss']
})
export class StaffAssignEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    //disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }

  staffassignForm: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  staff_dropdown: any;
  patient_dropdown: any;
  get_id:any='';
  get_data:any='';
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private atp: AmazingTimePickerService, public server: HttpServiceService, public router: Router) {
    this.staffassignForm = FormGroup;
  }
  adate: any;
  defaultMonth: IMyDefaultMonth | undefined;
    //==date picker==
    todateoptions: any;
    todateval: any = '';
    fromdateval: any = '';
    todatevaltemp: any = '';
    fromdatevaltemp: any = '';
    assign_date:any='';
  ngOnInit(): void {
    this.server.get("staffduty/stafflist").then((data: any) => {
      this.staff_dropdown = data.result.data;
    })

    this.server.get("staffduty/patientlist ").then((data: any) => {
      this.patient_dropdown = data.result.data;
    })
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loader = true;
    let fromval: any;
    let toval: any;
    this.server.get("staffduty/"+ val).then((data: any) => {
      this.loader = false;;
      if (data.status == 200) {
        console.log(data.result.data)   
        this.get_data = data.result.data
        console.log(this.get_data.staff_uid)  
        



        fromval=this.get_data.assign_date,
       

        this.fromdatevaltemp=this.get_data.assign_date;
     


        let startdateval2 = fromval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = '0'+ startdateval2[1];
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        this.assign_date = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.assign_date)
       // this.adate = moment(startdateval2[2] + "-" + startdateval2[1] + "-" + startdateval2[0]);
        
        this.myDatePickerOptions= {
          //disableUntil: { year: startdateval2[2], month: startdateval2[1] , day: startdateval2[0]  }
        };

        this.staffassignForm.patchValue({
          staffid: this.get_data.staff_uid,
          patientid: this.get_data.patient_uid,
          
          remarks:this.get_data.remarks,
          servicetype:this.get_data.servicetype,
          hourformat:this.get_data.hourformat,
          assign_time:this.get_data.assign_time,
          coordinator:this.get_data.coordinator,
          location:this.get_data.location,
          assign_date: this.assign_date,
        }) 

        }else if (data.status == 400) {
   
          this.success_modal.error_closemodal(data);
        }
        else if (data.status == 401) {
     
          this.success_modal.error_closemodal(data);
        }
    })


    this.staffassignForm = this.formBuilder.group({
      staffid: [''],
      patientid: [''],
      servicetype: ['', Validators.required],
      hourformat: ['', Validators.required],
      assign_date: ['', Validators.required],
      assign_time: ['', Validators.required],
      coordinator: ['', Validators.required], 
      location:['',Validators.required] ,    
      remarks: [''],

    })
  }
 //==
 onassignDateChanged(event: IMyDateModel) {

  

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
  // this.fromdatevaltemp = new Date(temp[0], Number(tempmonth), Number(tempday));
  // this.fromdatevaltemp = moment(temp[0] + "-" + tempmonth + "-" + tempday);

  // this.myDatePickerOptions_eod= {
  //   disableUntil: { year: yearvalueshown, month: monthvalueshown, day: dayvalueshown }
  // };

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
    console.log(val.assign_date)
    if (this.fromdateval== '') {
      this.fromdateval= this.fromdatevaltemp;
    }

    if (this.staffassignForm.valid) {
      let senddata = {
        staffid: this.get_data.staffid,
        patientid: this.get_data.patientid,
        servicetype: val.servicetype,
        hourformat: val.hourformat,
        assign_date: this.fromdateval,
        assign_time: val.assign_time,
        coordinator: val.coordinator,
        location:val.location,
        remarks: val.remarks,
      }

///console.log("upates",senddata)



      this.loader = true;
      this.server.post("staffduty/"+this.get_id, senddata).then((data: any) => {
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
      console.log("error");
    }

  }

  display(temp: any) {
    if (temp == 'SD') {
      this.router.navigateByUrl('staff-managment');
    }
  }
}
