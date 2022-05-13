import { Component, ViewChild, OnInit } from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth} from 'angular-mydatepicker';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component'
@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  currentDate = new Date();
  myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    dateRange: false,
    disableSince: { year: this.currentDate.getFullYear(), month: this.currentDate.getMonth() + 1, day: this.currentDate.getDate() +1 }
}
staffForm :any;
loader : boolean = false;
isSubmitted:boolean=false;

profile_file:any;
certificate1:any;
certificate2:any;
certificate3:any;

profile_file_name:any='';
certificate1_name:any='';
certificate2_name:any='';
certificate3_name:any='';

//==date picker==
todateoptions:any;
todateval:any='';
fromdateval:any='';
  constructor(private formBuilder: FormBuilder,public server : HttpServiceService,public router : Router) {
    this.staffForm = FormGroup;
   }
  dob:any;
  defaultMonth: IMyDefaultMonth | undefined ;
  ngOnInit(): void {
   
    this.staffForm = this.formBuilder.group({
      fname: ['',Validators.required],
      mobileno: ['',Validators.required],
      emailid: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$')]],
      qualification: ['',Validators.required],
      experience: ['',Validators.required],    
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['',Validators.required],
      file:[''],
      certificate1: [''],
      certificate2: [''],
      certificate3: [''],
      address_1: ['',Validators.required],
      remarks: [''],
    });
  }
  onDateChanged(event: IMyDateModel){
    
  this.dob=null;
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

 var evendateval:any;
 evendateval=event.singleDate?.jsDate;
 var temp23 = new Date(evendateval);
 temp23.setDate(temp23.getDate()-1);
 var monthvalueshown = temp23.getUTCMonth() + 1; 
 var dayvalueshown = temp23.getUTCDate()+1;
 var yearvalueshown = temp23.getUTCFullYear();
//  console.log('monthvalueshown---->',monthvalueshown);
//  console.log('dayvalueshown---->',dayvalueshown);
//  console.log('yearvalueshown---->',yearvalueshown);

 this.fromdateval = tempday+ "-" + tempmonth + "-" + temp[0] ;
 console.log(this.fromdateval)
 this.todateoptions = {
   disableUntil: { year: yearvalueshown, month:monthvalueshown, day:dayvalueshown }
 };
  }
  profileChange($event:any){
      let files = $event.target.files[0];     
      this.profile_file = files;
      var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'png'  ) {
        var reader = new FileReader();
        this.profile_file_name=$event.target.files[0].name;
        //console.log(this.profile_file)
      } else {         
        this.success_modal.staffuploaderror()
      }   
  }
 certificateChange1($event:any){
    let files = $event.target.files[0];   
    this.certificate1 = files;
    var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'png'  ) {
    this.certificate1_name=$event.target.files[0].name;
    } else {  
     
      this.success_modal.staffuploaderror()
    }   
}
certificateChange2($event:any){
  let files = $event.target.files[0];
  this.certificate2 = files;
  var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
  if (ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'png'  ) {
    var reader = new FileReader();
    this.certificate2_name=$event.target.files[0].name;
  } else {  
   
    this.success_modal.staffuploaderror()
  }   
}  

certificateChange3($event:any){
  let files = $event.target.files[0];
  this.certificate3 = files;
  var ext = files.name.substring(files.name.lastIndexOf('.') + 1);
  if (ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'png' ) {
    var reader = new FileReader();
    this.certificate3_name=$event.target.files[0].name;
  } else {  
   
    this.success_modal.staffuploaderror()
  }   
}


display(temp:any){
  if(temp=='S'){
    this.router.navigateByUrl('staff');
  }
}
  staff(val:any){   
    this.isSubmitted = true;
    console.log(val.gender)
    if(this.staffForm.valid){


    let senddata={
      fname: val.fname,
      mobileno: val.mobileno,
      emailid: val.emailid,
      file:this.profile_file,
      qualification: val.qualification,
      experience: val.experience,
      dob:this.fromdateval,
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
    this.server.fileUpload("staff",senddata,true,(res:any={})=>{     
      var data = JSON.parse(res);
      console.log(data)
      console.log(data.status)
      if(data.status==200){  
        this.loader = false;
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        data.type = 'S';
        this.success_modal.successmodal(data)
      }else if(data.status==400){
        this.loader = false;
        let result = [];
        data.result = [];
        data.result.mess = data.message;
        data.type = 'a';
        this.success_modal.error_closemodal(data);
      }else if(data.status==401){
        this.loader = false;
        this.success_modal.error_closemodal(data);
      }
    })
  } 
  else{

  }
}
}
