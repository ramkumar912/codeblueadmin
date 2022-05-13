import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: '.app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public href: string = "";
  get_name: any;
  get_subname:any='';
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let val = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(val)
    this.href = this.router.url;
    console.log(this.router.url);
    if (this.href == '/staff' || this.href == '/staff-add' || this.href == '/staff-edit' || this.href == '/staff-view' || this.href == '/staff-view/'+val || this.href == '/staff-edit/'+val) {
      this.get_name = 'Staff Details Management';
    } else if (this.href == '/dashboard') {
      this.get_name = 'dashboard';
    } else if (this.href == '/patient' || this.href == '/patient-add' || this.href == '/patient-edit/'+val ) {
      this.get_name = 'Patient Details Management';
    }  else if (this.href == '/staff-dashboard') {
      this.get_name = 'Staff Dashboard';
    }

    else if (this.href == '/staff-managment' || this.href == '/staff-assign' || this.href == '/staff-assign-view' || this.href == '/staff-assign-edit') {
      this.get_name = 'Staff Assign Management';
      this.get_subname='Staff Duty';
    }
    else if (this.href == '/staff-leave' || this.href == '/staff-leave-add/'+val || this.href == '/staff-leave-edit/'+val) {
      this.get_name = 'Staff Leave Management';
      this.get_subname='Staff Duty';
    }
    else if (this.href == '/staff-salary' || this.href == '/staff-salary-add/'+val || this.href == '/staff-salary-edit/'+val ) {
      this.get_name = 'Staff Salary Management';
      this.get_subname='Staff Duty';
    }
    else if (this.href == '/staff-close' || this.href == '/staff-close-add/'+val  || this.href == '/staff-close-edit/'+val    ) {
      this.get_name = 'Staff Close Management';
      this.get_subname='Staff Duty ';
    } 
    
    
    else if (this.href == '/staff-expense' || this.href == '/staff-expense-add' || this.href == '/staff-expense-edit/'+val) {
      this.get_name = 'Staff expense Management';
    } 
    else if(this.href=='/cordinator' || this.href=='/cord-edit/'+val || this.href=='/cord-view/'+val || this.href=='/cord-add'){
      this.get_name = 'Cordinator List Management';
    } else if(this.href=='/changepassword'){
      this.get_name = 'Change Password Management';
    } else if(this.href=='/staff-assign-edit/'+val){
      this.get_name = 'Staff Assign Management';
      this.get_subname='Staff Duty';
    }
    
    
    


  }

}
