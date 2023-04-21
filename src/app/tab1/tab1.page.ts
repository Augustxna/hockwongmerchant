import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import swal from 'sweetalert';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { WalletCreditPage } from '../wallet-credit/wallet-credit.page';
import { ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  logo = 'https://i.imgur.com/x5nDtlM.png';
  cash = 2500;
  categories = [
    // { photo: "https://assets1.lottiefiles.com/private_files/lf30_rnizksef.json", name_en: "Orders", name_zh: "订单", path: 'tabs/tab2' },
    { photo: "https://assets8.lottiefiles.com/packages/lf20_zzbz9na6.json", name_en: "Product", name_zh: "产品", path: 'tabs/tab3' },
    { photo: "https://assets5.lottiefiles.com/packages/lf20_8vcvc00i.json", name_en: "E-Menu", name_zh: "电子菜单", path: 'menu-list' },
  ]

  categories2 = [
    // { photo: "https://assets1.lottiefiles.com/packages/lf20_uDilo5.json", name_en: "My Chat", path: 'chat-list' },
    { photo: "https://assets2.lottiefiles.com/packages/lf20_gijtuajl.json", name_en: "Delivery Setting", name_zh: "邮递设置", path: 'delivery-list' },
    { photo: "https://assets7.lottiefiles.com/packages/lf20_9aaqrsgf.json", name_en: "Branch Outlet", name_zh: "分店", path: 'branch-list' },
    // { photo: "https://assets10.lottiefiles.com/private_files/lf30_dmeyipsz.json", name_en: "Support Ticket", name_zh: "辅助券", path: 'support-list' },
    { photo: "https://assets1.lottiefiles.com/packages/lf20_fhy1wvb1.json", name_en: "Language/更换语言", name_zh: "Language/更换语言", path: 'setting' },
    { photo: "https://assets5.lottiefiles.com/packages/lf20_dwivte2j.json", name_en: "1.0 Sales", name_zh: "1.0 销售", path: 'oldorderlist' },
  ]

  graphmax;
  graphselect = 6;
  graph = [
    {
      name: new Date().getTime() - (86400000 * 6),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 5),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 4),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 3),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 2),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 1),
      amount: 0,
    },
    {
      name: new Date().getTime() - (86400000 * 0),
      amount: 0,
    }
  ]
  // colors = [
  //   '#ffbc7d',
  //   '#fff27d',
  //   '#b7ff7d',
  //   '#7dffb3',
  //   '#7dfff8',
  //   '#7db5ff',
  //   '#a47dff',
  // ]

  theme = 'ff3729';

  vendor = {} as any;
  lang = 'en';
  language = {
    'Sales': {
      zh: '销售',
      en: 'Sales',
    }, 'Balance': {
      zh: '剩额',
      en: 'Balance',
    }, 'Credits': {
      zh: '积分',
      en: 'Credits',
    }, 'Scan QR': {
      zh: '扫描QR',
      en: 'Scan QR',
    }, 'Orders': {
      zh: '订单',
      en: 'Orders',
    }, 'Log Out': {
      zh: '登出',
      en: 'Log Out',
    }
  }

  constructor(
    public datepipe: DatePipe,
    public nav: NavController,
    private http: HttpClient,

    public storage: Storage,
    private modalController: ModalController,
    private actRoute: ActivatedRoute,
    public barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    private fcm: FCM,
  ) { }

  // call() {
  //   this.http.post('  https://hockwon.vsnap.my:3002/credittopup?orderid=-N2FtUhTanptUjD-BZe1', { data: { status: 'SUCCESS' } }).subscribe(a => {
  //     console.log(a);
  //   });
  // }

  dataer(a) {
    this.http.post('https://hockwon.vsnap.my:3002/venddortab1', { id: a.uid }).subscribe(a => {
      let temp = [] as any;
      console.log(a)
      this.vendor = a['vendor'];
      console.log(this.vendor);

      if (this.lengthof(a['sales'])) {
        Object.values(a['sales'][0]).reverse().forEach((element, i) => {
          temp.push({ name: this.datepipe.transform( new Date().getTime() - ((this.lengthof(a['sales'][0]) - 1 - i) * 86400000) , 'dd MMM'), amount: element })
        });

        this.graph = temp;

        console.log(this.graph)
        this.graphmax = Math.ceil(Math.max(...this.graph.map(a => a.amount)) / 100) * 100; 

      }
    })
  }

  vendor_ids = {} as any;;
  id;

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.id = a.uid
        this.actRoute.queryParams.subscribe(() => {
          this.graphmax = Math.ceil(Math.max(...this.graph.map(a => a.amount)) / 100) * 100; //  get heighest amount ,round up to nearest 100
          this.vendor_ids = a;
          this.dataer(a);
        })
      } else {
        this.nav.navigateRoot('login', { animationDirection: 'back' })
      }
    })

  }

  graphheight(x) {
    return Math.round((x / this.graphmax) * 200);
  }

  specificdaysales(x) { // got problem
    let temp = parseInt((new Date().getFullYear().toString()) + ((new Date(x).getMonth() + 1 >= 10 ? (new Date(x).getMonth() + 1).toString() : "0" +
      (new Date(x).getMonth() + 1).toString())) + ((new Date(x).getDate() >= 10 ? (new Date(x).getDate()).toString() : "0" + (new Date(x).getDate()).toString())))
    this.nav.navigateForward('tabs/tab2?date=' + temp)
  }

  async result(x) {
    this.nav.navigateForward('orderdetail?id=' + x.id + '&type=' + x.type + '&subject=' + x.type_id + "&scan=yes");
  }

  async result2(x) {
    // ?id=' + x.id + '&type=' + x.type + '&subject=' + x.type_id + "&scan=yes
    this.nav.navigateForward('fnb?id=' + x || 'vrNxbXvRogTOdn2d1FSXYQ0nDLJ3');
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  // scan() {
  //   // this.result2('C7jHvwGM5aMfGa9U7uIJ47lOcVw1');
  //   // this.result2('1');
  //   let temp = [] as any;
  //   console.log('hello1')
  //   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
  //     result => {
  //       console.log('Has permission?',result.hasPermission)
  //     },
  //     err => {
  //       console.log('hello')
  //       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  //     }
  //   );

  //   // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
  //   this.barcodeScanner.scan().then(barcodeData => {

  //     if (barcodeData.text) {
  //       temp = (barcodeData.text);
  //       console.log(temp)
  //     } else {
  //       console.log(1);

  //       swal({
  //         icon: 'error',
  //         title: 'Invalid QR Code',
  //         text: 'This QR code does not seems to be a valid Hock Wong QR code, please try again.',
  //         buttons: [false],
  //         closeOnEsc: false,
  //         closeOnClickOutside: false,
  //         timer: 1500
  //       })
  //     }
  //   }).catch(err => {
  //     console.log(2);

  //     console.log(err)
  //     swal({
  //       icon: 'error',
  //       title: 'Invalid QR Code',
  //       text: 'This QR code does not seems to be a valid Hock Wong QR code, please try again.',
  //       buttons: [false],
  //       closeOnEsc: false,
  //       closeOnClickOutside: false,
  //       timer: 1500
  //     })
  //   });
  // }

  doRefresh(event) {
    console.log('Begin async operation');
    this.dataer(this.vendor_ids);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  scan() {
    if (!this.vendor.physical) {
      swal({
        icon: 'error',
        title: '无权限',
        text: '您并没有权限使用此功能，请联系管理员以通开权限。',
        buttons: [false],
        timer: 1500
      })
    }
    else if (this.vendor.physical_rate == 0) {
      swal({
        icon: 'error',
        title: '无分利',
        text: '您在分利等于0的情况下无法使用此功能。',
        buttons: [false],
        timer: 1500
      })
    } else {
      let temp = [] as any;
      this.barcodeScanner.scan().then(barcodeData => {
        console.log(barcodeData);
        if (barcodeData.text) {
          temp = (barcodeData.text).split(',');
          if (temp[1] == 'users') {
            this.result2(temp[0]);
          } else {
            console.log(1);
            swal({
              icon: 'error',
              title: 'Invalid QR Code',
              text: 'This QR code does not seems to be a valid Hock Wong QR code, please try again.',
              buttons: [false],
              closeOnEsc: false,
              closeOnClickOutside: false,
              timer: 1500
            })
          }
        }
      }).catch(err => {
        console.log(err);
        swal({
          icon: 'error',
          title: 'Invalid QR Code',
          text: 'This QR code does not seems to be a valid Hock Wong QR code, please try again.',
          buttons: [false],
          closeOnEsc: false,
          closeOnClickOutside: false,
          timer: 1500
        })
      });
    }
  }

  pather(x) {
    this.nav.navigateForward(x);
  }

  async creditpage() {
    const modal = await this.modalController.create({
      component: WalletCreditPage,
      componentProps: { vendor: this.vendor }
    });

    await modal.present();
  }

  signout() {
    let buttons = {
      取消: {
        name_en: "Cancel",
        name_zh: "取消",
        value: "取消",
      },

      确定: {
        name_en: "Confirm",
        name_zh: "确定",
        value: "确定",
      },
    }

    swal({
      title: "登出",
      text: "确定?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {
            // this.doit();
            firebase.auth().signOut().then(a => {

              this.fcm.unsubscribeFromTopic(this.id);
              swal({
                icon: 'success',
                title: '成功登出!',
                text: "返回登陆页面",
                buttons: [false],
                timer: 1500
              });
            })
          }
        }
      });
  }
}
