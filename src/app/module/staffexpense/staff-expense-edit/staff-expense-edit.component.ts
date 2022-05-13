



import { Component, OnInit, ViewChild } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupComponent } from '../../../common/popup/popup.component'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-staff-expense-edit',
  templateUrl: './staff-expense-edit.component.html',
  styleUrls: ['./staff-expense-edit.component.scss']
})
export class StaffExpenseEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  adate: any;
  staff_dropdown: any;
  patient_dropdown: any;
  expenseForm: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  expense_date: any = ''
  get_id:any='';
  get_value:any='';
  tempname:any='';
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  config: any = {};
  tempdate:any;
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }

  constructor(private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, private router: Router, public sanitizer: DomSanitizer, public server: HttpServiceService) {
    this.expenseForm = FormGroup;
  }

  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');


    this.expenseForm = this.formBuilder.group({
      staffid: ['', Validators.required],
      patientid: ['', Validators.required],
      expense_date: ['', Validators.required],
      expense: ['', Validators.required],
      remarks: [''],

    })
    this.loader = true;
    let dateval;
    this.server.get("staffexpense/" + val).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        this.get_value = data.result.data;
        this.tempname = this.get_value.staff;
        console.log(this.get_value)
        this.tempdate=this.get_value.expense_date;
        dateval = this.get_value.expense_date;
        console.log(dateval)
        let startdateval2 = dateval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = '0'+ startdateval2[1];
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        console.log("startdateval2[2]",startdateval2[2])
        console.log("startdateval2[1]-month",startdateval2[1])

        this.expense_date = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.expense_date)
    
        this.expenseForm.patchValue({
          fname: this.get_value.fname,
          staffid:this.get_value.staffid,
          patientid:this.get_value.staffid,
          expense:this.get_value.expense,
          remarks:this.get_value.remarks,
        });

      }else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })
    this.server.get("staffexpense/stafflist").then((data: any) => {
      this.staff_dropdown = data.result.data;
      console.log(this.staff_dropdown)
      //  for (let i=0; i<this.staff_dropdown.length;i++){
      //   console.log(this.staff_dropdown[i].uid)
      //   this.patient_dropdown= this.staff_dropdown[i].uid
      //  }
    })

    this.server.get("staffexpense/patientlist").then((data: any) => {
      this.patient_dropdown = data.result.data;
    })
  }

  display(temp: any) {
    if (temp == 'X') {
      this.router.navigateByUrl('staff-expense');
    }
  }
  onDateChanged(event: IMyDateModel) {

    this.expense_date = null;
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
  staffexpense(val: any) {
    this.isSubmitted = true;
    console.log(this.expenseForm.controls['expense_date'].valid)
    console.log(val)

    if (this.expenseForm.valid) {
    
        if (this.fromdateval != '') {
               this.tempdate = this.fromdateval;
             }
      let senddata = {
        patientid: val.patientid,
        staffid: val.staffid,   
        expense: val.expense,    
        expense_date: this.tempdate,     
        remarks: val.remarks
      }

      this.loader = true;
      this.server.post("staffexpense/"+this.get_id, senddata).then((data: any) => {
        this.loader = false;

        console.log(data.result)
        console.log(data.result.message)

        if (data.status == 200) {
          this.loader = false;
          // let result = [];
          // data.result = [];
          data.result.type = 'X';
          this.success_modal.textsuccessmodal(data.result)
          // this.success_modal.textsuccessmodal(data.result.message)
        } else if (data.status == 400) {
          this.loader = false;
          // let result = [];
          // data.result = [];
          // data.result.mess = data.message;
          //data.type = 'P';
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 401) {
          this.loader = false;
          // let result = [];
          // data.result = [];
          // data.result.mess = data.message;
          // data.type = 'a';
          this.success_modal.error_closemodal(data.result);
        }
      })


    } else {
      console.log("error")
    }
  }
}
