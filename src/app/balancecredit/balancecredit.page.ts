import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, ModalController, NavParams, Platform } from '@ionic/angular';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';

@Component({
  selector: 'app-balancecredit',
  templateUrl: './balancecredit.page.html',
  styleUrls: ['./balancecredit.page.scss'],
})
export class BalancecreditPage implements OnInit {

  constructor(public navParams: NavParams, public modal: ModalController, public platform: Platform,
    // public bento: BentoService,
    public http: HttpClient, public safariViewController: SafariViewController
  ) { }


  @Input() hide: Boolean;

  select = 0;

  back() {
    this.modal.dismiss();
  }

  proper2(x) {
    return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
  }
  
  topups = [50, 100, 200, 500, 1000];

  withdraw(x) {

    let buttons = {
      取消: {
        name: "取消",
        value: "取消",
      },

      确定: {
        name: "确定",
        value: "确定",
      },
    }

    swal({
      title: "充值",
      text: "RM" + this.proper2(x || 0).toFixed(2) + "将加入您的充值余额，是否继续？",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == '确定') {
            swal({
              title: '请稍等',
              text: '付款中',
              buttons: [false],
              closeOnEsc: false,
              closeOnClickOutside: false,
            })

            // let key = firebase.database().ref('credit_pending').push({
            //   by: this.vendor.id,
            //   remark: '充值RM'+x.toFixed(2)+"商务钱币",
            //   credit: x,
            //   price: x,
            //   date: firebase.database.ServerValue.TIMESTAMP,
            //   to_type:"vendors",
            //   to_who: this.vendor.id,
            // }).key

            let key = firebase.database().ref('pushKey').push(firebase.database.ServerValue.TIMESTAMP).key

            firebase.database().ref('credit_pending/' + key).update({
              by: this.vendor.id,
              remark: '充值RM' + x.toFixed(2) + "商务钱币",
              credit: x,
              price: x,
              date: firebase.database.ServerValue.TIMESTAMP,
              to_type: "vendors",
              to_who: this.vendor.id,
            })
            // .then(() => {
            //   this.http.post('https://hockwon.vsnap.my:3002/credittopup?orderid=' + key, { data: { status: 'SUCCESS' } }).subscribe(a => {
            //     swal({
            //       icon: 'success',
            //       text: '您已成功充值' + x.toFixed(2) + '商务钱币',
            //       title: '成功充值',
            //       buttons: [false],
            //       timer: 2000,
            //     })
            //     console.log(a);
            //     this.modal.dismiss(1);
            //   }, e => {
            //     // console.log(e);
            //   })
            // })

            let body = {}

            if (this.vendor['id'] == 'ojy21SyjqPhhnJqZmtYsCRDGuTB2') {
              body = {
                amount: (1 * 100),
                orderdescription: ('Purchase Items').replace(/[^a-zA-Z ]/g, ""),
                ordertitle: 'Hock Wong Order',
                orderid: key,
                redirecturl: 'https://hwbuy2.web.app/credit?or  erId=' + key,
                callbackurl: 'https://hockwon.vsnap.my:3002/credittopup?orderid=' + key,
              }
            } else {
              body = {
                amount: (x * 100),
                orderdescription: ('Purchase Items').replace(/[^a-zA-Z ]/g, ""),
                ordertitle: 'Hock Wong Order',
                orderid: key,
                redirecturl: 'https://hwbuy2.web.app/credit?orderId=' + key,
                callbackurl: 'https://hockwon.vsnap.my:3002/credittopup?orderid=' + key,
              }
            }

            console.log(key);

            this.http.post('https://hockwon.vsnap.my:3002/newrevenueorder', body).subscribe(a => {
              console.log(a['item'].url)
              // console.log(JSON.parse(a['message']['body']))
              if (Object.values(a).length) {

                this.back();

                this.safariViewController.isAvailable()
                  .then((available: boolean) => {
                    if (available) {
                      this.safariViewController.show({
                        // url: JSON.parse(a['message']['body']).url,
                        url: a['item'].url,
                        transition: 'curl',
                        enterReaderModeIfAvailable: true,
                      })
                        .subscribe((result: any) => {
                          if (result.event === 'opened') swal.close();
                          else if (result.event === 'loaded') swal.close();
                          else if (result.event === 'closed') swal.close();
                        },
                          (error: any) => {
                            swal.close()
                            // window.open(JSON.parse(a['message']['body']).url, '_tab')
                            window.open(a['item'].url, '_tab')
                          }
                        );

                    } else {
                      swal.close()
                      // window.open(JSON.parse(a['message']['body']).url, '_tab');
                      window.open(a['item'].url, '_tab')
                    }
                  }).catch(e => {
                    swal.close()
                    // window.open(JSON.parse(a['message']['body']).url, '_tab');
                    window.open(a['item'].url, '_tab')
                  });

                // console.log(a);
              } else {
                swal({
                  icon: 'error',
                  title: '系统错误',
                  text: '系统出现问题, 请重试',
                  closeOnEsc: false,
                  closeOnClickOutside: false,
                  buttons: [false],
                  timer: 1500
                });
              }



            }, e => {
              console.log(e);
            })
          }
        }

      });


  }

  dater(date) {
    let style = "DDMMYYYY"
    let dd = (new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate().toString());
    let mm = ((new Date(date).getMonth() + 1) < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : (new Date(date).getMonth() + 1).toString());
    let yy = new Date(date).getFullYear().toString();

    return style.replace("DD", dd).replace("MM", mm).replace("YYYY", yy)
  }
  toint(x) {
    return parseInt(x);
  }
  dater2(date, style) {
    let dd = (new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate().toString());
    let mm = ((new Date(date).getMonth() + 1) < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : (new Date(date).getMonth() + 1).toString());
    let yy = new Date(date).getFullYear().toString();

    return style.replace("DD", dd).replace("MM", mm).replace("YYYY", yy)
  }

  allmerger = [] as any;

  @Input() payouts: any;
  @Input() logs: any;
  @Input() orders: any;
  @Input() vendor: any;
  @Input() vendor_acc: any;

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  ngOnDestroy() {
    console.log('Destroying 16 Balance')

  }

  ngOnInit() {


    console.log(this.hide)
    this.hide = false;

    // this.storage.create().then(() => {
    //   this.storage.get('lang').then(data => {
    //     this.lang = data || 'en';
    //   })
    // });
    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(b => {
          this.vendor = b['data'][1];
          this.vendor_acc = b['data'][0] || {};
          this.http.post('https://hockwon.vsnap.my:3002/vendorcreditpage', { vendor_id: a.uid }).subscribe(c => {
            this.allmerger = ((JSON.parse(JSON.stringify(c['credit'] || [])))).sort((x, y) => x.date > y.date ? -1 : 1) || [];
            console.log(this.allmerger);
          });
        })
      }
    })
  }

}
