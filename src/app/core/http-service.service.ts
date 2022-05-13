import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIG } from '../../app/config';
import { LocalStorage } from "./local_storage.service";
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { HttpClient } from '@angular/common/http';
declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  
  constructor(public http: Http, public router: Router) {
    this.http = http;
   }

   get(endPoint: string) {
    let headers: Headers = new Headers();
    let requestoptions: RequestOptions;
    headers.append("Cache-Control", 'no-cache');
    headers.append("Pragma", 'no-cache');
    headers.append("Content-Type", 'application/json');
    headers.append("Authorization", 'Bearer ' + localStorage.getItem('token'));
    headers.append('Access-Control-Allow-Origin', '*');
    requestoptions = new RequestOptions({
        method: RequestMethod.Get,
        url: CONFIG._url + endPoint,
        headers: headers
    })
    return this.http.request(new Request(requestoptions)).toPromise().then((res) => {
      return {
          status: res.status,
          result: res.json()
      }
    }, (err) => {
        if (err.status == 401) {
          return {
              status: err.status,
              result: err.json()
          }
        } else {
            return {
                status: err.status,
                result: err.json()
            };
        }
    })
  }

  post(endPoint: string, data: any, isJSON: boolean = true): any {
    let headers: Headers = new Headers();
    let requestoptions: RequestOptions;
    let theBody: any;
    if (isJSON) {
        theBody = JSON.stringify(data);
    } else {
        theBody = data
    }
    headers.append("Content-Type", 'application/json');
    headers.append("Authorization", 'Bearer ' + localStorage.getItem('token'));
    headers.append('Access-Control-Allow-Origin', '*');
    requestoptions = new RequestOptions({
        method: RequestMethod.Post,
        url: CONFIG._url + endPoint,
        headers: headers,
        body: theBody
    })
    return this.http.request(new Request(requestoptions)).toPromise().then((res) => {
      return {
          status: res.status,
          result: res.json()
      }
    }, (err) => {
        if (err.status == 401) {
            return {
              status: err.status,
              result: err.json()
            };
        } else {
            return {
              status: err.status,
              result: err.json()
            };
        }
    })
  }


    fileUpload(endPoint: string, data:any, tokenRequired:any, finalCallBack:any) {
        var xhr:any;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }
        var formData = new FormData();
        if (data != undefined && data != '') {
            for (var key in data) {
                formData.append(key, data[key]);
            }

        }
        xhr.upload.addEventListener("progress", function (e:any) {
            if (e.lengthComputable) {
                let percentage = Math.round((e.loaded * 100) / e.total);
                $('#progressvalue').text(percentage + '%' +' '+ 'uploaded..');
                 console.log(percentage);
                //progressCallBack(percentage);
            }
        }, false);
        xhr.upload.addEventListener("loadstart", function (e:any) {
        }, false);
        xhr.upload.addEventListener("load", function (e:any) {
        }, false);
        xhr.upload.addEventListener('error', function (e:any) {
        }, false);
        xhr.onreadystatechange = function (e:any) {
            setTimeout(() => {
                if (finalCallBack != undefined) finalCallBack(xhr.responseText);
            }, 2000);
        };
        //console.log("xhr.responseText----->",xhr.responseText)
        xhr.open('post', CONFIG._url + endPoint, true);
       if (tokenRequired) xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('token'));
        xhr.send(formData);
    }
  loggedIn(){
    //console.log(localStorage.getItem('token'))
    return !!LocalStorage.getValue('token');
}
  logOut() {
    LocalStorage.removeValue('userdata');
    LocalStorage.createJWT();
    localStorage.setItem('loggedIn', "false");
    this.router.navigate(['']);
  }
}
