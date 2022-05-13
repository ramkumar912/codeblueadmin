import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service.service';
import { LocalStorage } from 'src/app/core/local_storage.service';
import { PopupComponent } from '../popup/popup.component'
import { filter, pairwise } from 'rxjs/operators';
import {ConnectionService} from 'ng-connection-service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild(PopupComponent, { static: true })
  confirm_modal!: PopupComponent;
  userdata: any;
  public href: string = "";
  status :any= 'ONLINE';
  isConnected :boolean= true;
  role:any;
  username:any='';
  constructor(private connectionService: ConnectionService, private router: Router, public route: ActivatedRoute, public server: HttpServiceService) {



    if (LocalStorage.getValue('userdata') != undefined && LocalStorage.getValue('userdata') != null && LocalStorage.getValue('userdata') != '') {
      this.userdata = LocalStorage.getValue('userdata');
      console.log("userdata", this.userdata)

    }

    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
    });
  }
  login_status:any='';
  ngOnInit(): void {
    this.role=localStorage.getItem("user_role");
    this.username=localStorage.getItem("name");
console.log(localStorage.getItem("name"))
    
    this.login_status=localStorage.getItem('loggedIn')
    if(this.login_status!="true"){
      this.router.navigate(['']);
    }
   
   
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";       
        // let data='network has been connected'
        // this.confirm_modal.connection_modal(data);
        this.confirm_modal.connection_close()
      }
      else {
        this.status = "OFFLINE";
        let data='please check your network connection messenger';
        this.confirm_modal.connection_modal(data);
      }
    })
  
  }
  changepassword(data: any){
    
    // let sendData: any = {};
    // sendData.data = data;
    // this.confirm_modal.passwordmodal(sendData)
  }
 


  logout(data: any) {
    let sendData: any = {};
    sendData.data = data;
    this.confirm_modal.logoutmodal(sendData)
  }
}
