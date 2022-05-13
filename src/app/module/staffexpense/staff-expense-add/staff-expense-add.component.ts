import { Component, OnInit, ViewChild } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupComponent } from '../../../common/popup/popup.component'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-staff-expense-add',
  templateUrl: './staff-expense-add.component.html',
  styleUrls: ['./staff-expense-add.component.scss']
})
export class StaffExpenseAddComponent implements OnInit {
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
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  config: any = {};
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }

  constructor(private formBuilder: FormBuilder, private router: Router, public sanitizer: DomSanitizer, public server: HttpServiceService) {
    this.expenseForm = FormGroup;
  }

  ngOnInit(): void {

    this.expenseForm = this.formBuilder.group({
      staffid: ['', Validators.required],
      patientid: ['', Validators.required],
      expense_date: ['', Validators.required],
      expense: ['', Validators.required],
      remarks: [''],

    })

    this.server.get("staffexpense/stafflist").then((data: any) => {
      this.staff_dropdown = data.result.data;        
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
      let senddata = {
        patientid: val.patientid,
        staffid: val.staffid,   
        expense: val.expense,    
        expense_date: this.fromdateval,     
        remarks: val.remarks
      }

      this.loader = true;
      this.server.post("staffexpense", senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)

        if (data.status == 200) {
          this.loader = false;    
          data.result.type = 'X';
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


    } else {
      console.log("error")
    }
  }
}
