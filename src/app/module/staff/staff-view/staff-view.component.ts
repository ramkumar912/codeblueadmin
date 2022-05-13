import { Component, ViewChild, OnInit } from '@angular/core';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../../../common/popup/popup.component'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.scss']
})
export class StaffViewComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) { }
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  get_view:any='';
  loader:boolean=false;

  name:any;
  dob:any;
  address:any;
  remarks:any;
  qualification:any;
  experience:any;
  email:any;
  gender:any;
  mobileno:any;
  profile:any;
  certificate1:any;
  certificate2:any;
  certificate3:any;




  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    this.loader = true;
    this.server.get("staff/" + val).then((data: any) => {
      this.loader = false;
      if (data.status == 200) {
        this.get_view = data.result.data;
          this.name=this.get_view.fname;
          this.dob=this.get_view.dob;
          this.address=this.get_view.address_1;
          this.remarks=this.get_view.remarks;
          this.qualification=this.get_view.qualification;
          this.experience=this.get_view.experience;
          this.email=this.get_view.emailid;
          this.mobileno=this.get_view.mobileno;
          this.profile=this.get_view.profile_image;
          this.certificate1=this.get_view.certificate1;
          this.certificate2=this.get_view.certificate2;
          this.certificate3=this.get_view.certificate3;

          if(this.get_view.gender=='F'){
            this.gender="Female"
          }else if(this.get_view.gender=='M'){
            this.gender="Male" 
          }else{
            this.gender="Transgender" 
          }
       
      }
      else if(data.status == 400){
   
        this.success_modal.error_closemodal(data);
      }
      else if(data.status == 401){
   
        this.success_modal.error_closemodal(data);
      }
    })
  }

}
