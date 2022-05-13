import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: '.app-staff-management-dashboard',
  templateUrl: './staff-management-dashboard.component.html',
  styleUrls: ['./staff-management-dashboard.component.scss']
})
export class StaffManagementDashboardComponent implements OnInit {
  public href: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
