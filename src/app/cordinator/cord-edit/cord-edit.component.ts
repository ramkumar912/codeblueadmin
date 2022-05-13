
import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../common/popup/popup.component'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-cord-edit',
  templateUrl: './cord-edit.component.html',
  styleUrls: ['./cord-edit.component.scss']
})
export class CordEditComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  get_value: any;
  currentDate = new Date();
  cordinatorForm: any;
  dob: any;
  loader: boolean = false;
  isSubmitted: boolean = false;
  get_id: any;
  profile_file: any;
  certificate1: any;
  certificate2: any;
  certificate3: any;

  profile_file_name: any = '';
  certificate1_name: any = '';
  certificate2_name: any = '';
  certificate3_name: any = '';

  // tempdate
  tempprofile: any;
  tempdate: any;
  tempname:any;
  //==date picker==
  todateoptions: any;
  todateval: any = '';
  fromdateval: any = '';


  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() +1 }
  }
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.cordinatorForm = FormGroup;
  }

  ngOnInit(): void {

    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.get_id = this.activatedRoute.snapshot.paramMap.get('id');


    this.cordinatorForm = this.formBuilder.group({
      fname: ['', Validators.required],
      mobileno: ['', Validators.required],
      emailid: ['', Validators.required],
      qualification: ['', Validators.required],
      experience: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      file: [''],
      certificate1: [''],
      certificate2: [''],
      certificate3: [''],
      address_1: ['', Validators.required],
      remarks: [''],
    });

    this.loader = true;
    let dateval;
    this.server.get("adminuser/" + val).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        this.get_value = data.result.data;
        dateval = this.get_value.dob;
        this.tempname=this.get_value.fname;
        this.tempdate = this.get_value.dob
        this.profile_file = this.get_value.profile_image;
        this.certificate1 = this.get_value.certificate1;
        this.certificate2 = this.get_value.certificate2;
        this.certificate3 = this.get_value.certificate3;

        let startdateval2 = dateval.split("-");
        if (startdateval2[1] > 10) {
        } else {
          startdateval2[1] = startdateval2[1].substring(1);
        }
        if (startdateval2[2] > 10) {
        } else {
          startdateval2[2] = startdateval2[2].substring(1);
        }
        this.dob = { isRange: false, singleDate: { date: { year: Number(startdateval2[2]), month: Number(startdateval2[1]), day: Number(startdateval2[0]) } } };
        console.log(this.dob)
        // this.onDateChanged(this.get_value.dob)
        // this.profileChange(this.get_value.file);
        // this.certificateChange1(this.get_value.certificate1);
        // this.certificateChange2(this.get_value.certificate2);
        // this.certificateChange3(this.get_value.certificate3);


        this.cordinatorForm.patchValue({
          fname: this.get_value.fname,
          mobileno: this.get_value.mobileno,
          emailid: this.get_value.emailid,
          qualification: this.get_value.qualification,
          experience: this.get_value.experience,
          gender: this.get_value.gender,
          state: this.get_value.state,
          city: this.get_value.city,
          pincode: this.get_value.pincode,
          address_1: this.get_value.address_1,
          remarks: this.get_value.remarks,
        });
      } 
      else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })


  }

  onDateChanged(event: IMyDateModel) {

    console.log(event)
    this.dob = null;
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

  }



  profileChange($event: any) {
    let files = $event.target.files[0];
    this.profile_file = files;
    var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
      var reader = new FileReader();
      this.profile_file_name = $event.target.files[0].name;
      console.log(this.profile_file_name)
    } else {
      this.success_modal.staffuploaderror()
    }
  }
  certificateChange1($event: any) {
    let files = $event.target.files[0];
    this.certificate1 = files;
    var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
      this.certificate1_name = $event.target.files[0].name;
    } else {

      this.success_modal.staffuploaderror()
    }
  }
  certificateChange2($event: any) {
    let files = $event.target.files[0];
    this.certificate2 = files;
    var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
      var reader = new FileReader();
      this.certificate2_name = $event.target.files[0].name;
    } else {

      this.success_modal.staffuploaderror()
    }
  }

  certificateChange3($event: any) {
    let files = $event.target.files[0];
    this.certificate3 = files;
    var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
      var reader = new FileReader();
      this.certificate3_name = $event.target.files[0].name;
    } else {

      this.success_modal.staffuploaderror()
    }
  }

  display(temp:any){
    if(temp=='C'){
      this.router.navigateByUrl('cordinator');
    }
  }
  cordinator(val: any) {

    this.isSubmitted = true;

    if (this.cordinatorForm.valid) {
      if (this.fromdateval != '') {
        this.tempdate = this.fromdateval;
      }

      let senddata = {
        fname: val.fname,
        mobileno: val.mobileno,
        emailid: val.emailid,
        file: this.profile_file,
        qualification: val.qualification,
        experience: val.experience,
        dob: this.tempdate,
        gender: val.gender,
        state: val.state,
        city: val.city,
        pincode: val.pincode,
        certificate1: this.certificate1,
        certificate2: this.certificate2,
        certificate3: this.certificate3,
        address_1: val.address_1,
        remarks: val.remarks,
      }
      this.loader = true;
      this.server.fileUpload("adminuser/" + this.get_id, senddata, true, (res: any = {}) => {
        var data = JSON.parse(res);
        console.log(data.message)
        console.log(data.status)
        if (data.status == 200) {
          this.loader = false;
          let result = [];
          data.result = [];
          data.type='C';
          data.result.mess = data.message;       
          this.success_modal.successmodal(data)
        } else if (data.status == 400) {
          this.loader = false;
          let result = [];
          data.result = [];
          data.result.mess = data.message;
          this.success_modal.error_closemodal(data);
        }
      })
    }
    else {

    }
  }
}

