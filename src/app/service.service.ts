import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  uploadToImgur(base64) {
    return new Promise((resolve, reject) => {
      let header = new HttpHeaders({
        Authorization: 'Client-ID 632a8f69c4e5817'
      })
      let body = {
        image: base64 // this is the base64img from upper part
      }
      this.http.post(' https://api.imgur.com/5/image ', body, { headers: header }).subscribe(res => {
        resolve(res['data'].link)
      }, awe => {
        reject(awe)
      })
    })
  }

  uploadToImgbb(base64) {
    return new Promise((resolve, reject) => {
      let body = {
        image: base64
      }
      this.http.post('https://api.imgbb.com/1/upload?expiration=0&key=b4a88c4849bb052c1823c6a31b1cc7c4', body, {}).subscribe(res => {
        resolve(res['data'].url)
      }, awe => {
        reject(awe)
      })
    })
  }

  private subjecter = new BehaviorSubject<any>(0);

  publishPop(data: any) {
    this.subjecter.next(data);
  }

  getPop(): Subject<any> {
    return this.subjecter;
  }
}
