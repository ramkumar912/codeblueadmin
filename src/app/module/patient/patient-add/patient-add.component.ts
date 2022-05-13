import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component'
@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;

  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }
  doj: any;
  patientForm: any;
  isSubmitted: boolean = false;
  loader: boolean = false;


  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';

  constructor(private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.patientForm = FormGroup;
  }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      fname: ['', Validators.required],
      gender: ['', Validators.required],
      address_1: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      doj: ['', Validators.required],
      remarks: [''],
    })
  }
  onDateChanged(event: IMyDateModel) {

    this.doj = null;
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
    console.log(this.fromdateval)
    this.todateoptions = {
      disableUntil: { year: yearvalueshown, month: monthvalueshown, day: dayvalueshown }
    };
  }
  display(temp:any){
    if(temp=='P'){
      this.router.navigateByUrl('patient');
    }
  }
  patient(val: any) {
    this.isSubmitted = true;
    if (this.patientForm.valid) {

      let senddata = {
        fname: val.fname,
        gender: val.gender,
        doj: this.fromdateval,
        state: val.state,
        city: val.city,
        address_1:val.address_1,
        pincode: val.pincode,
        remarks:val.remarks,
        age:12,
      }
      this.loader = true;
      this.server.post("patient", senddata).then((data: any) => {
        this.loader = false;
     
        console.log(data.result)
        console.log(data.result.message)

        if(data.status==200){  
          this.loader = false;
          // let result = [];
          // data.result = [];
           data.result.type='P';
          this.success_modal.textsuccessmodal(data.result)
          // this.success_modal.textsuccessmodal(data.result.message)
        }else if(data.status==400){
          this.loader = false;
          // let result = [];
          // data.result = [];
          // data.result.mess = data.message;
          //data.type = 'P';
          this.success_modal.error_closemodal(data.result);
        }
        else if(data.status==401){
          this.loader = false;
          // let result = [];
          // data.result = [];
          // data.result.mess = data.message;
          // data.type = 'a';
          this.success_modal.error_closemodal(data.result);
        }
      })

    } else {

    }
  }
}
