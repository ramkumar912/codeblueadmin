import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component'
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;

  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }
  get_value:any;
  tempname:any;
  doj: any;
  patientForm: any;
  isSubmitted: boolean = false;
  loader: boolean = false;


  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  get_id:any='';
  tempdate:any;
  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.patientForm = FormGroup;
  }

  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');

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


    this.loader = true;
    let dateval:any;
    this.server.get("patient/" + val).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data)
        this.get_value = data.result.data;
        this.tempdate=this.get_value.doj;
        console.log(this.get_value)
        dateval = this.get_value.doj;
        this.tempname=this.get_value.fname;
        let startdateval2 = dateval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = '0' + startdateval2[1];
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        this.doj = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.doj)    
        
        //this.tempdate= this.doj ;
        this.patientForm.patchValue({
          fname: this.get_value.fname,         
          gender: this.get_value.gender,
          state: this.get_value.state,
          city: this.get_value.city,
          pincode: this.get_value.pincode,
          address_1: this.get_value.address_1,
          remarks: this.get_value.remarks,
        });
      } 
      else if(data.status == 400){
        // let result = [];
        // data.result = [];
        // data.result.mess = data.message;
        this.success_modal.error_closemodal(data.result);
      }
      else if(data.status == 401){
        // let result = [];
        // data.result = [];
        // data.result.mess = data.message;
        this.success_modal.error_closemodal(data.result);
      }
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
 if (this.fromdateval != '') {
        this.tempdate = this.fromdateval;
      }

      let senddata = {
        fname: val.fname,
        gender: val.gender,
        doj: this.tempdate,
        state: val.state,
        city: val.city,
        address_1:val.address_1,
        pincode: val.pincode,
        remarks:val.remarks,
        age:'',
      }
      this.loader = true;
      this.server.post("patient/"+ this.get_id, senddata).then((data: any) => {
        this.loader = false;
     


        if(data.status==200){  
          this.loader = false;
     
          data.result.type='P';
          this.success_modal.textsuccessmodal(data.result)
          //this.success_modal.textsuccessmodal(data.result.message)
         }else if(data.status==400){
          this.loader = false;
          // let result = [];
          // data.result = [];
          // data.result.mess = data.message;
          // data.type = 'P';
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

