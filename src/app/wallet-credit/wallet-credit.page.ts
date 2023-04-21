import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, ModalController, NavParams, Platform } from '@ionic/angular';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-wallet-credit',
  templateUrl: './wallet-credit.page.html',
  styleUrls: ['./wallet-credit.page.scss'],
})
export class WalletCreditPage implements OnInit {
  constructor(public navParams: NavParams, public modal: ModalController, public platform: Platform, public storage: Storage,
    public http: HttpClient, public safariViewController: SafariViewController
  ) { }


  @Input() hide: Boolean;

  select = 0;
  lang = 'en';
  language = {
    'Credit Remain': {
      zh: '充值余额',
      en: 'Credit Remain',
    }, 'Top Up Option': {
      zh: '充值选项',
      en: 'Top Up Option',
    }, 'Nothing in the list': {
      zh: '暂时没有资料',
      en: 'Nothing in the list',
    }, 'No Content': {
      zh: '此栏暂无内容',
      en: 'No Content',
    }, 'Top Up': {
      zh: '充值',
      en: 'Top Up',
    }, 'Consumption': {
      zh: '消费',
      en: 'Consumption',
    },
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });
    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          this.vendor = a['data'][1];
          this.vendor_acc = a['data'][0] || {};
          console.log(a);
        })

        this.http.post('https://hockwon.vsnap.my:3002/vendorcreditpage', { vendor_id: a.uid }).subscribe(c => {
          this.allmerger = ((JSON.parse(JSON.stringify(c['credit'] || [])))).sort((x, y) => x.date > y.date ? -1 : 1) || [];
        });
      }
    })
  }

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

            let key = firebase.database().ref('pushKey').push(firebase.database.ServerValue.TIMESTAMP).key
            console.log(key);

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
            //     this.back();
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
                redirecturl: 'https://hwbuy2.web.app/credit?orderId=' + key,
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


            // this.http.post('https://hockwon.vsnap.my:3002/revmonster', body).subscribe(a => {
            //   let link = a['item'].url

            //   firebase.database().ref('credit_pending/' + key).on('value', data => {
            //     if (data.exists()) {
            //       console.log("Hearing but nothing heree=")
            //     } else {
            //       console.log("Hearing and there is something")
            //       // qqqqqqqqqq API
            //       // call api extract logs_token <<< must be same key
            //       this.http.post('https://hockwon.vsnap.my:3002/getlogs_credit', { id: key }).subscribe(k => {
            //         console.log(k['data'])
            //         if (k['data']) {
            //           swal({
            //             icon: 'success',
            //             title: 'Credit Purchased',
            //             text: "Thank you for your purchase! Have fun!",
            //             // closeOnEsc: false,
            //             // closeOnClickOutside: false,  
            //             buttons: [false],
            //             timer: 3000
            //           }).then(() => {
            //             this.back();
            //           })
            //         }
            //       }, e => { })
            //     }
            //   })

            //   // console.log(JSON.parse(a['message']['body']).url);
            //   if (this.platform.is('ios')) {
            //     this.safariViewController.isAvailable()
            //       .then((available: boolean) => {
            //         if (available) {
            //           this.safariViewController.show({
            //             url: link,
            //             transition: 'curl',
            //             enterReaderModeIfAvailable: true,
            //           })
            //             .subscribe((result: any) => {
            //               if (result.event === 'opened') swal.close();
            //               else if (result.event === 'loaded') swal.close();
            //               else if (result.event === 'closed') swal.close();
            //             },
            //               (error: any) => {
            //                 swal.close()
            //                 window.open(link, '_tab')
            //               }
            //             );

            //         } else {
            //           swal.close()
            //           window.open(link, '_tab');
            //         }
            //       }).catch(e => {
            //         swal.close()
            //         window.open(link, '_tab');
            //       });
            //   } else {
            //     swal.close()
            //     window.open(link, '_tab')
            //   }
            // }, e => {
            //   // console.log(e);
            // })




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


}
