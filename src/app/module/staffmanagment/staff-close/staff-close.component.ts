


import { Component, ViewChild, OnInit } from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth} from 'angular-mydatepicker';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-staff-close',
  templateUrl: './staff-close.component.html',
  styleUrls: ['./staff-close.component.scss']
})

export class StaffCloseComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  loader:boolean=false;
  myDatePickerOptions_sod: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() +1 }
}
myDatePickerOptions_eod: IAngularMyDpOptions = {
  dateFormat: 'dd-mm-yyyy',
  dateRange: false,
  disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() +1 }
}
start_date:any='';
end_date:any='';
 staffcloselist:any='';

  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  urlsafe: any;
  downloadexcel: boolean = false;



  //==Pagination Values Start Here==
  page: any;
  total_item: number = 0;
  breadcrumbs: any = [];
  page_per_size: number = 10;
  current_page!: number;
  total_page!: number;
  activeItem: number = -1;
  activePage: number = 1;
  activePageCount: number = 1;
  source: any;


  page_count!: number;
  search: any;

  constructor(private router: Router, private atp: AmazingTimePickerService, public sanitizer: DomSanitizer, public server: HttpServiceService) { }


  ngOnInit(): void {
    this. staffclose_list(0);

  }

  reset() {
    this.fromdateval = '';
    this.todateval = '';
    this. staffclose_list(0);
  }

  staffleave_view(val: any, check: any) {
    if (check == "view") {
      this.loader = true;
      this.server.get("patient/" + val).then((data: any) => {
        this.loader = false;
        if (data.status == 200) {
          console.log(data.result.data)
          let temp = {};
          temp = data.result.data
          this.success_modal.view_patient_modal(temp);
          // this.expenselist = data.result.data
          // this.total_item = data.result.total;
        } else if (data.status == 400) {
          let result = [];
          data.result = [];
          data.result.mess = data.message;
          this.success_modal.error_closemodal(data);
        }
        else if (data.status == 401) {
          let result = [];
          data.result = [];
          data.result.mess = data.message;
          this.success_modal.error_closemodal(data);
        }
      })

    } else if (check == "edit") {
      this.router.navigate(['patient-edit/' + val]);
    }
  }
  //==
  //==For Pagination Use the 3 functions below ==
  getServerData(event: number) {
    this.page_count = (event - 1);
    this.onPageChange(this.page_count);
    this. staffclose_list(this.page_count)
    //this.export(this.page_count);
  }
  //==
  onPageChange(event: number) {
    this.activeItem = -1;
    this.activePage = event + 1;
    this.activePageCount = (event - 1);
  }
  //==

  search_table() {
    this.current_page = 0;
    this.activePage = 0;
    this.current_page = 0;
    this.activePage = 1;
    this.current_page = 0;
    this.activePageCount = 0;
    this. staffclose_list(0);
    // this.export(0);
  }

  //==Pagination along with search ends here ==
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

    this.myDatePickerOptions_eod = {
      disableUntil: { year: yearvalueshown, month: monthvalueshown, day: dayvalueshown }
    };

  }
  //==
  onTodatechanged(event: IMyDateModel) {
    if (this.start_date == null) {
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
  staffclose_list(pagevalue: any) {
    this.loader = true;
    this.server.post("staffduty/listdata?page=" + pagevalue + "&limit=10&orderby=modified_on|desc", { search: this.search,isclosed:1,fromdate: this.fromdateval, todate: this.todateval }).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.staffcloselist = data.result.data
        this.total_item = data.result.total;
      } else if (data.status == 400) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
    })
  }

  go(pagevalue: any = 0) {
    this.loader = true;
    this.server.post("staffduty/listdata?page=" + pagevalue + "&limit=10&orderby=id|desc", { search: this.search, fromdate: this.fromdateval, todate: this.todateval,isclosed:1 }).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this. staffcloselist = data.result.data
        this.total_item = data.result.total;  
      } else if (data.status == 400) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
    })
  }
  export() {
    this.loader = true;
    this.server.post("staffduty/export?orderby=id|desc", { search: this.search, fromdate: this.fromdateval, todate: this.todateval,isclosed:1}).then((data: any) => {
      this.loader = false;
      console.log(data)
      if (data.status == 200 && data.result.data != "") {
        this.downloadexcel = true;
        let url = data.result.data;
        this.urlsafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else if (data.status == 406) {
        alert("Error");
      }

    })
  }
  close_view(val: any ) {

    this.loader=true;
    this.server.get("staffduty/" + val).then((data: any) => {
      this.loader=false;
      if (data.status == 200) {
        //console.log(data.result.data)
        let temp = {};
        temp =data.result.data
        
          this.success_modal.view_close_modal(temp); 

      } else if (data.status == 400) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
      else if (data.status == 401) {
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        this.success_modal.error_closemodal(data);
      }
    })
   
  }
}

