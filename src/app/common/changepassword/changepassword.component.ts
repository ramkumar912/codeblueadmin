import { Component, OnInit, NgZone,ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { IAngularMyDpOptions, IMyDateModel, IMyDefaultMonth } from 'angular-mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupComponent } from '../../common/popup/popup.component'
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  success_modal!: PopupComponent;
  changepasswordForm:any;
  isSubmitted:boolean=false;
  loader:boolean=false;
  constructor(private formBuilder: FormBuilder, public server: HttpServiceService, public router: Router) {
    this.changepasswordForm = FormGroup;
  }
  ngOnInit(): void {
    this.changepasswordForm = this.formBuilder.group({
      oldpassword: ['',Validators.required],
      password: ['',Validators.required],  
      cpassword: ['',Validators.required],  

    })
  }

  display(temp: any) {
    if (temp == 'CP') {
      this.router.navigateByUrl('login');
    }
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
          //alert("Password has been changed Successfully");
          this.success_modal.textsuccessmodal(data.result)
          //this.router.navigate(['/login']);
        } else if (data.status == 400) {
          this.loader = false;
          //alert(data.result.message)
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 404) {
          this.loader = false;
          data.result.type = 'CP';
          this.success_modal.error_closemodal(data.result);
        }
        else if (data.status == 401) {
          this.loader = false;
          data.result.type = 'CP';
          this.success_modal.error_closemodal(data.result);
        }
      })
    } else {
      //alert("error");
    }
  }
}
