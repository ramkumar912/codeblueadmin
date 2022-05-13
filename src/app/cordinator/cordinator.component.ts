
import { Component, OnInit, ViewChild } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../common/popup/popup.component'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-cordinator',
  templateUrl: './cordinator.component.html',
  styleUrls: ['./cordinator.component.scss']
})
export class CordinatorComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  public href: string = "";
  cordinatorlist: any;
  loader: boolean = false;
  downloadexcel:boolean=false;


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
  page_count!: number;
  search: any;

  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';
  urlsafe: any;
  currentDate = new Date();

  myDatePickerOptions_sod: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }

  }

  myDatePickerOptions_eod: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() + 1 }
  }
  constructor(private router: Router, public sanitizer: DomSanitizer, public server: HttpServiceService) { }
  start_date: any;
  end_date: any;




  ngOnInit(): void {
    console.log(localStorage.getItem('token'))
    this.cordinator_list(0);
    //this.export(0);
  }


  reset(){
   this.start_date='';
   this.end_date='';
   this.cordinator_list(0);
  }


  //==
  //==For Pagination Use the 3 functions below ==
  getServerData(event: number) {
    this.page_count = event - 1;
    this.onPageChange(this.page_count);
    this.cordinator_list(this.page_count)
    //this.export(this.page_count);
  }
  //==
  onPageChange(event: number) {
    this.activeItem = -1;
    this.activePage = event+1;
    this.activePageCount = event - 1;
  }
  //==

  search_table() {
    this.current_page = 1;
    this.activePage = 0;
    this.cordinator_list(0);
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
      // this.enddate = null;
      //  this.todateoptions = {
      //   dateRange: false,
      //   dateFormat: 'dd-mmm-yyyy',
      //   disableUntil: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() - 1 }
      // }
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



  cordinator_list(pagevalue: any): any {
    this.loader = true;
    this.server.post("adminuser/listdata?page=" + pagevalue + "&limit=10&orderby=userid|desc", { search: this.search }).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.cordinatorlist = data.result.data
        this.total_item = data.result.total;
      } else if (data.status == 400) {
        // let result = [];
        // data.result = [];
        // data.result.mess = data.message;
        this.success_modal.error_normal(data.result.message);
      }
      else if (data.status == 401) {
        console.log(data)
        // let result = [];
        // data.result = [];
        // data.result.mess = data.result.message;
        this.success_modal.error_normal(data.result.message);
      }
    })
  }

  cordinatorlist_view(val: any, check: any) {
    if (check == "view") {
      this.router.navigate(['cord-view/' + val]);
    } else if (check == "edit") {
      this.router.navigate(['cord-edit/' + val]);
    }
  }

  go(pagevalue: any = 0) {
    this.loader = true;
    this.server.post("adminuser/listdata?page=" + pagevalue + "&limit=10&orderby=userid|desc", { search: this.search, fromdate: this.fromdateval, todate: this.todateval }).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        console.log(data.result.data)
        this.cordinatorlist = data.result.data
        this.total_item = data.result.total;
      } else if (data.status == 400) {
        // let result = [];
        // data.result = [];
        // data.result.mess = data.message;
        this.success_modal.error_normal(data.result.message);
      }
      else if (data.status == 401) {
        // let result = [];
        // data.result = [];
        // data.result.mess = data.message;
        this.success_modal.error_normal(data.result.message);
      }
    })
  }
  export() {
    this.loader = true;
    this.server.post("adminuser/export?orderby=userid|desc", { search: this.search, fromdate: this.fromdateval, todate: this.todateval }).then((data: any) => {
      this.loader = false;
      console.log(data)
      if (data.status == 200 && data.result.data != "") {
        this.downloadexcel=true;
        let url = data.result.data;
        this.urlsafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else if (data.status == 406) {
        this.success_modal.error_normal(data.result.message);
      }

    })
  }
}
