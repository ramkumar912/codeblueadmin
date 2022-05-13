import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logForm :any;
  loader : boolean = false;
  isSubmitted: boolean | undefined;
  showerror : boolean = false;
  errMsg: any;
  
  hide : boolean = true;
  constructor(private formBuilder: FormBuilder,public server : HttpServiceService,public router : Router) {
    this.logForm = FormGroup;
    LocalStorage.createJWT();
   }

  ngOnInit(): void {
    this.logForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  enterkey(e:any){
    this.showerror = false;
  }
  showpassword(){
    this.hide = !this.hide;
  }
  login(val:any){
    this.isSubmitted = true;
    if(this.logForm.valid){
      let senddata = {
        username : val.username,
        password : val.password, 
         
      }
      this.loader = true;
      this.server.post("login",senddata).then((res:any)=>{
        this.loader = false;
       
        if(res.status == 200 && res.result.message=='Success'){
          this.showerror = false;    
          console.log(res.result.data.token)  
          LocalStorage.setValue('token', res.result.data.token);  
          localStorage.setItem('token', res.result.data.token);  
         
          LocalStorage.setValue('userdata',res.result.data);
          LocalStorage.setValue('loggedIn', true);
          localStorage.setItem('loggedIn', "true");
          localStorage.setItem('user_role',res.result.data.role)
          localStorage.setItem('name',res.result.data.fname);
          this.router.navigateByUrl('dashboard');
        }else if(res.status == 400){
          this.showerror = true;
          this.errMsg = res.result.message;
        }else if(res.status == 401){
          this.showerror = true;
          this.errMsg = res.result.message;
        }
      })
    }else{

    }
  }
}
