import { Component, Input, OnInit, } from '@angular/core';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import firebase from "firebase/app";
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(public nav: NavController, public platform: Platform, public storage: Storage,
    public http: HttpClient, private alertController: AlertController,
  ) { }

  select = 0;
  vendor = [] as any;
  lang = 'en';
  language = {
    'Balance': {
      zh: '收入余额',
      en: 'Balance',
    }, 'Withdraw': {
      zh: '取款',
      en: 'Withdraw',
    }, 'Other Transaction': {
      zh: '其它款项',
      en: 'Other Transaction',
    }, 'Special Order': {
      zh: '特价订单',
      en: 'Special Order',
    }, 'Sales Order': {
      zh: '销售订单',
      en: 'Sales Order',
    }, 'Purchase': {
      zh: '购买',
      en: 'Purchase ',
    }, 'In Shop Purchase': {
      zh: '上门消费',
      en: 'In Shop Purchase',
    }, 'Withdraw Success On': {
      zh: '取款成功于',
      en: 'Withdraw Success On ',
    }, 'Withdraw Pending': {
      zh: '取款处理中',
      en: 'Withdraw Pending',
    }, 'Unit': {
      zh: '个',
      en: ' Unit ',
    },
  }

  ngOnInit() {

    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(user => {
      this.http.post('https://hockwon.vsnap.my:3002/getsomelogs', { userid: user.uid }).subscribe(a => {
        this.logs = a['data'] || [];

        console.log(this.logs)
        this.http.post('https://hockwon.vsnap.my:3002/getsomepayouts', { userid: user.uid }).subscribe(b => {
          this.payouts = b['data'] || [];

          let holdlast = [];

          let holder = (this.payouts).concat((this.logs).filter(a => a['amount'] > 0))
          let holder3 = (holder).concat((this.experience).filter(a => a['price_now'] > 0))
          let holder2 = holder3.concat(holdlast)
          this.allmerger = (holder2.sort((a, b) => (a['date'] || 0) > (b['date'] || 0) ? -1 : 1) || [])
        console.log(this.allmerger)

          // });
        })
      })

      this.http.post('https://hockwon.vsnap.my:3002/getvendorwallet', { vendor_id: user.uid }).subscribe(b => {

        this.vendor = b['data']
        console.log(this.vendor)
      })

    })


  }


  back() {
    this.nav.pop();
  }

  proper2(x) {
    return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
  }

  withdraw() {

    if (this.vendor.bank_account && this.vendor.bank_name && this.vendor.bank_type && this.vendor.ssm) {

      if (this.vendor['earn'] > 0) {
        let buttons = {
          Cancel: {
            name: "Cancel",
            value: "Cancel",
          },

          Confirm: {
            name: "Confirm",
            value: "Confirm",
          },
        }

        swal({
          title: "Credit Withdrawal",
          text: "RM" + this.proper2(this.vendor['earn'] || 0).toFixed(2) + " will be deposited into your bank account within 30-45 day(s). Are you sure?",
          icon: 'warning',
          buttons: buttons,
          // dangerMode: true,
        })
          .then((value) => {
            if (value != "") {
              if (value == "Confirm") {

                swal({
                  title: 'Processing',
                  text: 'Please wait',
                  closeOnEsc: false,
                  closeOnClickOutside: false,
                  buttons: [false],
                });

                // this.bento.genkey().then(key => {

                this.http.post('https://hockwon.vsnap.my:3002/insertpayouts', {
                  amount: this.proper2(this.vendor['earn']),
                  // id: key,
                  status: false,
                  date: new Date().getTime(),
                  amount_actual: this.proper2(this.vendor['earn']),
                  rate: this.vendor['pay_rate'],
                  type: "vendors",
                  userid: this.vendor['id'],
                }).subscribe((s) => {

                  // this.bento.trigger(this.vendor.id);

                  swal({
                    icon: 'success',
                    title: 'Withdrawal Successful',
                    text: 'Amount will be processed and deposited into your bank account within 5-7 working days.',
                    buttons: [false],
                    timer: 1500
                  });
                  this.nav.pop();

                }, e => {

                })

                // })

              }
            }

          });


      } else {
        swal({
          icon: 'error',
          title: 'Unable to Withdrawal',
          text: 'You need to have at least RM1 to withdraw!',
          buttons: [false],
          timer: 1500
        });
      }
    } else {

      this.presentAlertPrompt();
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: '请填写一下资料',
      subHeader: '我们需要已下资料来完成汇款',
      inputs: [
        {
          name: 'ssm',
          type: 'text',
          placeholder: '公司注册号码',
          value: this.vendor['ssm'] || ""
        }, {
          name: 'bank_type',
          type: 'text',
          placeholder: '银行名字 (eg. Maybank)',
          value: this.vendor['bank_type'] || ""
        },
        {
          name: 'bank_name',
          type: 'text',
          placeholder: '银行持有人 (eg. John Doe)',
          value: this.vendor['bank_name'] || ""
        },
        // multiline input.
        {
          name: 'bank_account',
          type: 'text',
          placeholder: '银行账号 (eg. 1127 8105 4842)',
          value: this.vendor['bank_account'] || ""

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: (ans) => {
            if (ans.ssm && ans.bank_type && ans.bank_name && ans.bank_account) {

              this.vendor.ssm = ans.ssm,
                this.vendor.bank_type = ans.bank_type,
                this.vendor.bank_name = ans.bank_name,
                this.vendor.bank_account = ans.bank_account,
                this.http.post('https://hockwon.vsnap.my:3002/updatevendors', {
                  ssm: ans.ssm,
                  bank_type: ans.bank_type,
                  bank_name: ans.bank_name,
                  bank_account: ans.bank_account,
                  id: this.vendor.id,
                }).subscribe((s) => {
                  console.log(s);

                  this.withdraw();
                }, e => {
                  console.log(e);

                  swal({
                    icon: 'error',
                    title: 'Information Update Failed',
                    text: 'Something is wrong, please try again.',
                    // closeOnEsc: false,
                    // closeOnClickOutside: false,
                    buttons: [false],
                    timer: 1500
                  });
                })

            } else {

              swal({
                icon: 'error',
                title: 'Update Fail',
                text: 'PLease fill up all the information requirement.',
                // closeOnEsc: false,
                // closeOnClickOutside: false,
                buttons: [false],
                timer: 1500
              });
            }
          }
        }
      ]
    });

    await alert.present();
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
    // let dd = (new Date(date).getDate() < 10 ? "0" + new Date(date).getDate().toString() : new Date(date).getDate().toString());
    // let mm = ((new Date(date).getMonth() + 1) < 10 ? "0" + (new Date(date).getMonth() + 1).toString() : (new Date(date).getMonth() + 1).toString());
    // let yy = new Date(date).getFullYear().toString();

    // return style.replace("DD", dd).replace("MM", mm).replace("YYYY", yy)

    return new Date(date).getTime();
  }

  allmerger = [] as any;
  experience = [] as any;

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  ngOnDestroy() {
    console.log('Destroying 16 Balance')

  }

  payouts = [] as any;
  logs = [] as any;
  orders = [] as any;

  checker(x) {
    return Object.keys(x || {}).length > 0;
  }


  returnnumber(x) {

    let y = x.toString()

    if (y.length == 4) {

      return "INVW-0000" + y

    } else if (y.length == 5) {

      return "INVW-000" + y

    } else if (y.length == 6) {

      return "INVW-00" + y

    } else if (y.length == 7) {

      return "INVW-0" + y

    } else if (y.length == 8) {

      return "INVW-" + y

    } else if (y.length == 3) {

      return "INVW-00000" + y

    } else if (y.length == 2) {

      return "INVW-000000" + y

    }
    else if (y.length == 1) {

      return "INVW-0000000" + y

    }

  }

  returnsaletotal(x) {

    return this.allmerger.filter(a => a['inv'] == x).reduce((b, c) => (b + (((c.price_now - c.price_comm_ori - c.price_vsnap) * c.qty) + (c.price_delivery || 0))), 0)

  }


}
