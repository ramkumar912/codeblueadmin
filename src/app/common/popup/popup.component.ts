import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public href: string = "";
  is_modal_visible: boolean = false;
  is_modal_success_visible: boolean = false;
  is_modal_staff_uploaderror: boolean = false;
  is_error: boolean = false;;
  is_error_data: any;
  is_success_data: any;
  is_connection: boolean = false;
  is_connection_data: boolean = false;
  is_modal_success_text_visible: boolean = false;
  is_patient_view: boolean = false;
  is_expense_view: boolean = false;
  is_password:boolean=false;
  is_password_data:any='';
  is_patient_viewdata: any = '';
  is_expense_viewdata:any='';
  is_type:any;
  is_type_text:any;
  changepasswordForm:any;
  isSubmitted:boolean=false;
  loader:boolean=false;

  salary_data_view:any='';
  is_salary_view:boolean = false;
  is_leave_viewdata:any='';
  is_leave_view:boolean = false;
  is_duty_close_view:boolean = false;
  is_duty_close_viewdata:any='';

  constructor(private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.changepasswordForm = FormGroup;
  }
  @Output() sendCount = new EventEmitter();
  ngOnInit(): void {

    this.changepasswordForm = this.formBuilder.group({
      oldpassword: ['',Validators.required],
      password: ['',Validators.required],  
      cpassword: ['',Validators.required],  

    })
  }
  public logoutmodal(data: any = {}) {
    this.is_modal_visible = true;
  }

  public staffuploaderror() {
    this.is_modal_staff_uploaderror = true;
  }
  public successmodal(data: any) {
    this.is_modal_success_visible = true;
    this.is_success_data = data.message;
    console.log(data)
    console.log(data.message)
    this.is_type=data.type
  
  }


  public textsuccessmodal(data: any) {
    this.is_modal_success_text_visible = true;
    this.is_success_data = data.message;
    this.is_type_text=data.type
    console.log(this.is_success_data)
    console.log(data)

  }
  public view_expense_modal(data:any={}){
    this.is_expense_view=true;
    this.is_expense_viewdata=data;
    console.log("vall-->", data)
  }
  public view_patient_modal(data: any = {}) {
    this.is_patient_view = true;
    console.log("vall-->", data)
    this.is_patient_viewdata = data;
  }

  public view_staffsalary_modal(data:any={}){
    this.is_salary_view=true;
    this.salary_data_view= data;
    console.log("vall-->", data)
  }

  public view_leave_modal( data:any={}){
    this.is_leave_view=true;
    this.is_leave_viewdata= data;
    console.log("vall-->", data)
  }


  public view_close_modal(data:any={}){
    this.is_duty_close_view=true;
    this.is_duty_close_viewdata= data;
    console.log("vall-->", data)
  }
  salary_view_close(){
    this.is_salary_view=false;
  }
  leave_view_close(){
    this.is_leave_view=false;
  }

  duty_view_close(){
    this.is_duty_close_view=false;
  }
  expense_view_close(){
    this.is_expense_view=false;
  }
  public error_normal(data: string) {
    console.log(data)
    this.is_error = true;
    this.is_error_data = data;
  }


  public error_closemodal(data: any) {
    this.is_error = true;
    this.is_error_data = data.result.message;
    console.log(data)
  }

  public connection_modal(data: any) {
    this.is_connection = true;
    this.is_connection_data = data;
  }

  public passwordmodal(data:any){
    this.is_password=true;
    this.is_password_data=data;
  }

  connection_close() {
    this.is_connection = false;
  }




  close() {
    this.is_modal_visible = false;
  }

  error_close() {
    this.is_error = false;
  }
  common_close_modal() {
    this.is_modal_success_visible = false; 
    this.sendCount.emit(this.is_type);
  }

  patient_view_close() {
    this.is_patient_view = false;
  }
  text_close_modal() {
    this.is_modal_success_text_visible = false;
    this.sendCount.emit(this.is_type_text);
    // this.router.navigateByUrl('patient');

    if(this.is_type_text=="CP"){
      this.router.navigate(['login']);
    }else{
      
    }
  }

  staffuploaderror_close() {
    this.is_modal_staff_uploaderror = false;
  }


  logout() {
    LocalStorage.removeValue('userdata');
    LocalStorage.setValue('loggedIn', false);
    localStorage.clear();
    LocalStorage.createJWT();
    this.router.navigate(['/login']);
  }


  changepassword(val: any) {
    this.isSubmitted = true;
  
    if (this.changepasswordForm.valid) {
      let senddata = {
        oldpassword:val.oldpassword,
        password:val.cpassword       
      }

      this.loader = true;
      this.server.post("login/changepassword ", senddata).then((data: any) => {
        this.loader = false;
        console.log(data.result)
        console.log(data.result.message)
        if (data.status == 200) {
          this.loader = false;
          data.result.type = 'CP';
          alert("Password has been changed Successfully");
          this.router.navigate(['/login']);
        } else if (data.status == 400) {
          this.loader = false;
          alert(data.result.message)
          //this.error_closemodal(data.result);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'CP';
          alert(data.result.message)
        }
        else if (data.status == 401) {
          this.loader = false;
          data.result.type = 'CP';
          alert(data.result.message)
        }
      })
    } else {
      //alert("error");
    }
  }

}
