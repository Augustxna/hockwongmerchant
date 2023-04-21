import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import firebase from 'firebase'
import swal from 'sweetalert';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor(private actRoute: ActivatedRoute,
    private http: HttpClient,
    private nav: NavController,
    private alertController: AlertController,
    public router: Router,
    public storage: Storage,) { }

  id
  orders = [] as any;
  total = 0
  subtotal = 0
  delivery = 0
  discount = 0
  vendor = {} as any;
  vendor_acc = {} as any;
  lang = 'en';
  language = {
    "Order Detail": {
      zh: "订单详情",
      en: "Order Detail",
    },
    "Completed": {
      zh: "完成",
      en: "Completed",
    },
    "Delivery": {
      zh: "配送模式",
      en: "Delivery",
    },
    "Self Collection": {
      zh: "自取模式",
      en: "Self Collection",
    },
    "Subtotal": {
      zh: "总计",
      en: "Subtotal",
    },
    "Total": {
      zh: "总计",
      en: "Total",
    },
    "items": {
      zh: "商品数量",
      en: "item(s)",
    },
    "Generate Invoice": {
      zh: "生成发票",
      en: "Generate Invoice",
    },
    "Share": {
      zh: "分享",
      en: "Share",
    },
    "Reference ID": {
      zh: "编码",
      en: "Reference ID",
    },
    "Date & Time": {
      zh: "日期与时间",
      en: "Date & Time",
    },
    "Shipping Fee": {
      zh: "运费",
      en: "Shipping Fee",
    },
    "Discounted": {
      zh: "折扣",
      en: "Discounted",
    },
    "Payment Method": {
      zh: "付款方式",
      en: "Payment Method",
    },
    "Order Information": {
      zh: "订单详情",
      en: "Order Information",
    }, "self collect": {
      zh: "自取模式",
      en: "Self Collect",
    }, "Food & Travel": {
      zh: "吃喝玩乐",
      en: "Food & Travel",
    }, "Special Remarks": {
      zh: "特别备注",
      en: "Special Remarks",
    }, "Delivery Status": {
      zh: "物流详情",
      en: "Delivery Status",
    }, "No Tracking No For Now": {
      zh: "暂无提供物流单号",
      en: "No Tracking No For Now",
    }, "Order Complete": {
      zh: "完成订单",
      en: "Order Complete",
    }, "Edit": {
      zh: "编辑",
      en: "Edit",
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
        this.actRoute.queryParams.subscribe(q => {
          this.id = q['id'];
          this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
            this.vendor = a['data'][0];
            this.vendor_acc = a['data'][1] || {};
            this.http.post('https://hockwon.vsnap.my:3002/getordercartv2', { cart_id: this.id, id: this.vendor.id }).subscribe(b => {
              console.log(b);
              this.orders = b['data']
              console.log(this.orders)
              this.delivery = this.orders.reduce((a, b) => (a + (b['price_delivery'] || 0)), 0)
              this.total = this.orders.reduce((a, b) => (a + ((b['price_retail'] * b['qty']) + b['price_delivery'])), 0)
              // this.discount = this.orders.reduce((a, b) => (a + (b['price_offer'] || 0)), 0)
            })
          })
        });


      }
    })

    // this.bento.getVendor().subscribe(a => {
    //   if (a) {

    //     this.vendor = a || {};

    //     this.actRoute.queryParams.subscribe(a => {
    //       this.id = a['id'];

    //       if (this.id) {

    //         this.http.post('https://hockwon.vsnap.my:3002/getordercartv', { cart_id: this.id, id: this.vendor['id'] }).subscribe(a => {

    //           console.log(a)

    //           this.orders = a['data']

    //           console.log(this.orders)

    //           this.delivery = this.orders.reduce((a, b) => (a + (b['price_delivery'] || 0)), 0)

    //           this.total = this.orders.reduce((a, b) => (a + ((b['price_now'] * b['qty']) - ((b['price_comm_ori'] + b['price_vsnap']) * b['qty']) + b['price_delivery'])), 0)

    //           this.discount = this.orders.reduce((a, b) => (a + (b['price_offer'] || 0)), 0)

    //         })

    //       }

    //     })

    //   } else {
    //     this.nav.navigateRoot('home');
    //   }
    // })

    // this.bento.getVendoracc().subscribe(a => {
    //   this.vendor_acc = a || {};
    // })

  }

  system = {
    interface: 'vsnap',
    lang: 'zh',
    lat: 3,
    long: 102,
  };



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

  lengthof(x) {
    return Object.keys(x || []).length
  }

  returnqty(x) {
    return this.orders.filter(a => a['by'] = x).reduce((a, b) => (a + b['qty']), 0)
  }

  reutrnvendortotal(x) {
    return this.orders.filter(a => a['by'] = x).reduce((a, b) => (a + (((b['price_now'] - b['price_comm_ori'] - b['price_vsnap']) * b['qty']) + b['price_delivery'])), 0)
  }

  reutrnvendordelivery(x) {
    return this.orders.filter(a => a['by'] = x).reduce((a, b) => (a + b['price_delivery']), 0)
  }

  chat(x) {
    console.log(x)
    swal({
      // icon: 'success',
      title: '开启聊天室',
      text: '等待中',
      closeOnEsc: false,
      closeOnClickOutside: false,
      buttons: [false],
      // timer: 1500
    });

    firebase.database().ref('chatrooms/').orderByChild('users/' + x.userid).equalTo("users").once('value', haha => {

      if (this.lengthof(Object.values(haha.val() || {}).filter(a => this.lengthof(a['users']) == 2 && a['users'][x.by] == "vendors")) > 0) {
        setTimeout(() => {
          swal.close()
        }, 100);
        this.nav.navigateForward('chatdetail?id=' +
          (Object.values(haha.val() || {}).filter(a => this.lengthof(a['users']) == 2 && a['users'][x.by] == "vendors"))[0]['id']
        )

      } else {

        let keyer = firebase.database().ref('pushKey').push(firebase.database.ServerValue.TIMESTAMP).key

        firebase.database().ref('chatrooms/' + keyer).update({
          // contents: [],
          id: keyer,
          date: firebase.database.ServerValue.TIMESTAMP,
          last_chat: "You've started a conversation with " + x.by,
          last_date: firebase.database.ServerValue.TIMESTAMP,
          last_seen: { [x.userid]: firebase.database.ServerValue.TIMESTAMP },
          last_by: "System",
          last_by_id: "system",
          name: "",
          users: {
            [x.userid]: "users",
            [x.by]: "vendors",
          },
        }).then(() => {
          setTimeout(() => {
            swal.close()
          }, 100);
          // 70:30, full sponsor, mou ceremony, preview, full class + system, 9/9, branker vs vgolive 11am
          this.router.navigateByUrl('tabs/tab-chat')
          setTimeout(() => {
            this.nav.navigateForward('chatdetail?id=' + keyer)
          }, 50);

        })


      }

    })

  }

  back() {
    this.nav.pop()
  }

  async openalert(x) {
    console.log(x)
    const alert = await this.alertController.create({
      mode: "ios",
      header: 'Shipment Tracking',
      subHeader: "Please enter the shipment tracking information",
      inputs: [
        {
          name: 'company',
          type: 'text',
          value: x.tracking_company || "",
          placeholder: 'Courier Company Name'
        },
        {
          name: 'number',
          type: 'text',
          value: x.tracking_account || "",
          placeholder: 'Tracking Number'
        },

      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('确定 取消');
          }
        }, {
          text: 'Save',
          handler: (data) => {
            if (data['company'] || data['number']) {

              console.log({
                cart_id: x.cart_id,
                vendor_id: this.vendor.id,
                tracking_company: data['company'] || "",
                tracking_account: data['number'] || "",
              });

              this.http.post('https://hockwon.vsnap.my:3002/updatetracking', {
                cart_id: x.cart_id,
                vendor_id: this.vendor.id,
                tracking_company: data['company'] || "",
                tracking_account: data['number'] || "",
              }).subscribe((s) => {

                console.log(s)
                // Ggggggggggggggggggg call email trigger

                for (let i = 0; i < this.lengthof(this.orders); i++) {

                  this.orders[i].tracking_company = data['company'] || "";
                  this.orders[i].tracking_account = data['number'] || "";

                }

                // this.bento.trigger(this.vendor['id']);

              }, e => {
                console.log(e)
                swal({
                  icon: 'error',
                  title: '发生了错误',
                  text: 'Please try again later.',
                  // closeOnEsc: false,
                  // closeOnClickOutside: false,
                  buttons: [false],
                  timer: 1500
                });
              })



            } else {

              console.log('no number')

            }
          }
        }
      ]
    });

    await alert.present();
  }

  scan_com() {

    if ((this.orders[0].collect_type == 'delivery' && this.orders[0].tracking_company) || this.orders[0].collect_type != 'delivery') {

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
        title: "完成此订单",
        text: "是否把此订单标记为已完成?",
        icon: 'warning',
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {

          if (value == "确定") {

            console.log(this.orders)
            // this.aloop(0, this.lengthof(this.orders))

            let total = this.orders.reduce((a, b) => (a + b['price_retial_ori'] * b['qty']), 0) + (this.orders[0]['price_delivery'] || 0)

            console.log(total)

            let body = {
              total: total,
              cart_id: this.id,
              by_type: "vendor_acc",
              by_name: this.vendor_acc['name'],
              by: this.vendor_acc['id'],
              vendor_id: this.orders[0]['vendor_id'],

            }

            console.log(body)

            this.http.post('https://hockwon.vsnap.my:3002/redeemorders', body).subscribe((s) => {

              console.log(s)

              if (s['success'] == 1) {

                let temp2 = {
                  title: "已发货！",
                  body: "商家已发货! 商品:" + this.orders.namecn,
                  path: 'tabs/tab2',
                  topic: this.orders['userid'],
                }
                this.http.post('https://hockwon.vsnap.my:3002/fcmAny', temp2).subscribe(data2 => {
                  console.log(data2);
                }, e => {
                  console.log(e);
                });

                swal({
                  icon: 'success',
                  title: '标记成功',
                  text: "款项已加入您的钱包",
                  buttons: [false],
                  timer: 3000

                })

                this.nav.pop()

              } else {

                swal({
                  icon: 'error',
                  title: '标记失败',
                  text: "请稍后尝试",
                  buttons: [false],
                  timer: 3000

                })

              }

            }, e => {

              swal({
                icon: 'error',
                title: '标记失败',
                text: "请稍后尝试",
                buttons: [false],
                timer: 3000

              })

            })


          }
        })

    } else {

      swal({
        title: "质料不全",
        text: "请先输入邮寄详情",
        icon: 'warning',

        // dangerMode: true,
      })

    }

  }

  aloop(i, length) {

    console.log(i)

    if (length > i) {

      console.log('true')

      this.http.post('https://hockwon.vsnap.my:3002/redeemafforders', {
        id: this.orders[i].id,
        by_type: "vendor_acc",
        by_name: this.vendor_acc['name'],
        by: this.vendor_acc['id'],
        earn_influencer: 0,
        earn_vendor: ((this.orders[i].price_now - this.orders[i].price_comm_ori - this.orders[i].price_vsnap) * this.orders[i].qty) + this.orders[i].price_delivery,
        qty: this.orders[i]['qty'],
      }).subscribe((s) => {

        this.orders[i].used = [{
          by_type: "vendor_acc",
          by_name: this.vendor_acc['name'],
          by: this.vendor_acc['id'],
          date: new Date().getTime()
        }]


        this.aloop(i + 1, length)

      })

    } else {

      // end
      // this.bento.trigger(this.vendor['id']);
      this.nav.pop()
      swal({
        icon: 'success',
        title: 'Redemption Completed',
        text: "The redemption is completed. Receivable amount of RM" + this.total + " has been credited into your vendor wallet.",
        closeOnEsc: false,
        closeOnClickOutside: false,
        buttons: [false],
        timer: 2000
      })


    }

  }

  checkSingleVar(eve) {
    
    return (this.lengthof(eve) && this.lengthof(eve['vardetail']) == 1 && this.lengthof(eve['vardetail'][0]['selections']) == 1)
    
  }

}
