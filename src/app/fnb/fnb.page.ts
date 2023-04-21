import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
// import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BalancecreditPage } from '../balancecredit/balancecredit.page';
// import { BalancecreditPage } from '../balancecredit/balancecredit.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fnb',
  templateUrl: './fnb.page.html',
  styleUrls: ['./fnb.page.scss'],
})
export class FnbPage implements OnInit {


  constructor(private http: HttpClient, private nav: NavController,
    private actRoute: ActivatedRoute, private routerOutlet: IonRouterOutlet, private modal: ModalController,public storage: Storage,) { }

  user = [] as any;
  vendor = [] as any;
  remark = '';
  price_now = 0;

  lang = 'en';
language = {
  "Food and Travel": {
    zh: "吃喝玩乐",
    en: "Food & Travel",
  },"Sales Remarks": {
    zh: "销售备注",
    en: "Sales Remarks",
  },"Name": {
    zh: "名字",
    en: "Name",
  },"Phone Number": {
    zh: "电话号码",
    en: "Phone Number",
  },"Total Comsumption": {
    zh: "总消费数额",
    en: "Total Comsumption",
  },"Remarks": {
    zh: "备注",
    en: "Remarks",
  },"Confirm Sales": {
    zh: "确定 Sales",
    en: "Confirm Sales",
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
        this.actRoute.queryParams.subscribe(b => {
          console.log({ userid: b.id, vendorid: a.uid });
          if (b.id && a.uid) {
            this.http.post('https://hockwon.vsnap.my:3002/fnbgetdata', { userid: b.id || 'vrNxbXvRogTOdn2d1FSXYQ0nDLJ3', vendorid: a.uid }).subscribe(a => {
              console.log(a);
              this.user = a['user'];
              this.vendor = a['vendor'];
            })
          } else {
            this.back();
          }

        })
      }
    })
  }

  lengthof(x) {
    return x ? Object.keys(x) : 0;
  }

  proper2(x) {
    return Math.round(((Math.abs(x) || 0) + Number.EPSILON) * 100) / 100
  }

  async tocredit() {
    const modal = await this.modal.create({
      component: BalancecreditPage,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == 1) {
      this.ngOnInit();
    }
  }

  buys() {
    // + 1000
    if (this.vendor['credit'] + (this.vendor['physical_credit'] || 0) >= this.proper2(this.price_now * this.vendor.physical_rate)) {

      swal({
        title: '处理中',
        text: 'Please Wait',
        buttons: [false],
        closeOnEsc: false,
        closeOnClickOutside: false,
        timer: 10000,
      })

      this.checkout();
    } else {

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
        title: "充值余额不足",
        text: "仍需RM " + (this.proper2(this.price_now * this.vendor.physical_rate)).toFixed(2) + " 立刻添加余额?",
        icon: 'warning',
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {

          if (value == '确定') {
            this.tocredit()

          }

        }
        )

      // }
    }
  }


  checkout() {

    console.log(

      {
        date: new Date().getTime(),
        vendor_id: this.vendor.id,
        physical_rate: this.vendor.physical_rate,
        comm_rate: this.vendor.comm_rate,
        user_id: this.user.id,
        remark: this.remark,
        fnb_remark: '吃喝玩乐佣金(' + this.user.name + ' 于' + this.vendor.name + '消费满RM ' + this.proper2(this.price_now) + ')',
        feedback: '',
        feedback_photo: '',
        feedback_date: null,
        feedback_rating: null,
        price_buy: this.proper2(this.price_now),
        price_comm: this.proper2(this.price_now * this.vendor.physical_rate * this.vendor.comm_rate),
        price_now: this.proper2(this.price_now * this.vendor.physical_rate),
        user_type: (this.user['dealer'] || this.user['vip_expiry'] > new Date().getTime()) ? 'agent' : 'user',
        referral_by: this.vendor.referred_by || '',
        referral_rate: this.vendor.referral_rate || 0,
        referral_price: this.proper2(this.price_now * this.vendor.physical_rate * (this.vendor.referral_rate || 0)),
        referral_remark: '吃喝玩乐佣金(' + this.vendor.name + ' 获得销售 RM ' + this.proper2(this.price_now) + ')'

      }
    )

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

    if (this.price_now > 0) {
      swal({
        title: "确认订单",
        text: "是否确认此吃喝玩乐订单？",
        icon: 'warning',
        buttons: buttons,
        // dangerMode: true,
      })
        .then((value) => {
          if (value == '确定') {
            let temp = {
              date: new Date().getTime(),
              vendor_id: this.vendor.id,
              physical_rate: this.vendor.physical_rate,
              comm_rate: this.vendor.comm_rate,
              user_id: this.user.id,
              remark: this.remark,
              fnb_remark: '吃喝玩乐佣金(' + this.user.name + ' 于' + this.vendor.name + '消费满RM ' + this.proper2(this.price_now) + ')',
              feedback: '',
              feedback_photo: '',
              feedback_date: null,
              feedback_rating: null,
              price_buy: this.proper2(this.price_now),
              price_comm: this.proper2(this.price_now * this.vendor.physical_rate * this.vendor.comm_rate),
              price_now: this.proper2(this.price_now * this.vendor.physical_rate),
              user_type: (this.user['dealer'] || this.user['vip_expiry'] > new Date().getTime()) ? 'agent' : 'user',
              referral_by: this.vendor.referred_by || '',
              referral_rate: this.vendor.referral_rate || 0,
              referral_price: this.proper2(this.price_now * this.vendor.physical_rate * this.vendor.referral_rate),
              referral_remark: '吃喝玩乐佣金(' + this.vendor.name + ' 获得销售 RM ' + this.proper2(this.price_now) + ')'

            }

            console.log(temp);

            this.http.post('https://hockwon.vsnap.my:3002/insertfnborder', temp).subscribe(a => {

              let temp2 = {
                title: "获得佣金！",
                body: "您以从吃喝玩乐获得RM" + this.proper2(this.price_now * this.vendor.physical_rate * this.vendor.comm_rate).toFixed(2) + "!",
                path: 'tabs/tab2',
                topic: this.user['id'],
              }
              this.http.post('https://hockwon.vsnap.my:3002/fcmAny', temp2).subscribe(data2 => {
                console.log(data2);
              }, e => {
                console.log(e);
              });


              console.log(a);
              swal.close()
              this.nav.pop();;
              swal({
                icon: 'success',
                title: '订单确定',
                text: "谢谢你使用我们的平台!",
                buttons: [false],
                timer: 3000
              })

            }, e => { });
          }
        })

    } else {
      swal({
        icon: 'error',
        title: '输入错误',
        text: "消费数目需大于0!",
        buttons: [false],
        timer: 3000
      })
    }

  }


  back() {
    this.nav.pop();
  }

}
