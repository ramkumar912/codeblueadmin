import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../../common/popup/popup.component'

@Component({
  selector: 'app-staff-leave-add',
  templateUrl: './staff-leave-add.component.html',
  styleUrls: ['./staff-leave-add.component.scss']
})
export class StaffLeaveAddComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }
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
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  urlsafe: any;
  downloadexcel: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.staffleaveForm = FormGroup;
  }
  adate: any;
  defaultMonth: IMyDefaultMonth | undefined;
  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loader = true;
    this.server.get("staffduty/" + val).then((data: any) => {
      this.loader = false;;
      if (data.status == 200) {
        console.log(data.result.data)

        this.get_data = data.result.data
        console.log(this.get_data.staff_uid)

        this.staffleaveForm.patchValue({
          staffid: this.get_data.staff_uid,
          patientid: this.get_data.patient_uid,
          remarks:this.get_data.remarks
        });

      } else if (data.status == 400) {
   
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
   
        this.success_modal.error_closemodal(data);
      }
    })
    this.staffleaveForm = this.formBuilder.group({
      staffid: [''],
      patientid: [''],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
      remarks: [''],

    })
  }

  //==
  onFromDateChanged(event: IMyDateModel) {

    this.end_date = null;
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

    this.todateoptions = {
      disableUntil: { year: yearvalueshown, month: monthvalueshown, day: dayvalueshown }
    };

  }
  //==
  onTodatechanged(event: IMyDateModel) {
    if (this.todate == null) {
      console.log("event---->", event)

      this.end_date = null;
      let result = [];
      let data: any = {};
      data.result = [];
      data.result.mess = 'From Date should be selected before selecting the End Date';
      data.type = 'a';
      this.success_modal.error_closemodal(data);

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
  //==
  display(temp: any) {
    if (temp == 'SL') {
      this.router.navigateByUrl('staff-leave');
    } else if (temp == 'REST') {      
      this.fromdate = '';
      this.todate = '';
    }
  }


  staffleave(val: any) {
    this.isSubmitted = true;
    console.log(val.fromdate.singleDate.formatted)

    if (this.staffleaveForm.valid) {
      let senddata = {
        dutyid: this.get_id,
        fromdate: val.fromdate.singleDate.formatted,
        todate: val.todate.singleDate.formatted,
        remarks: val.remarks
      }

      this.loader = true;
      this.server.post("staffduty/leave", senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)
        if (data.status == 200) {
          this.loader = false;
          data.result.type = 'SL';
          this.success_modal.textsuccessmodal(data.result)
        } else if (data.status == 400) {
          this.loader = false;
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'REST';
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
