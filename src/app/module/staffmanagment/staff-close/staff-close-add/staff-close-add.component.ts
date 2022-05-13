import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../../common/popup/popup.component'

@Component({
  selector: 'app-staff-close-add',
  templateUrl: './staff-close-add.component.html',
  styleUrls: ['./staff-close-add.component.scss']
})
export class StaffCloseAddComponent implements OnInit {
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

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.staffcloseForm = FormGroup;
  }

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

        this.staffcloseForm.patchValue({
          staffid: this.get_data.staff_uid,
          patientid: this.get_data.patient_uid,
          assign_date:this.get_data.assign_date,
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

    })
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
      this.router.navigateByUrl('staff-managment');
    } else if (temp == 'REST') {
      this.fromdate = '';
      this.todate = '';
    }
  }
  staffclose(val: any) {
    this.isSubmitted = true;
  
    if (this.staffcloseForm.valid) {
      let senddata = {
        id: this.get_id,
        end_date:  this.todateval,
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
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'CL';
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
