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
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor( public datepipe: DatePipe,
    public nav: NavController,
    private http: HttpClient,

    public storage: Storage,
    private modalController: ModalController,
    private actRoute: ActivatedRoute,
    public barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    private safariViewController: SafariViewController,
    private fcm: FCM,) { }

  id = null
  vendor_ids = {} as any;;

  vendor = {} as any;
  lang = 'en';
  news2 = []
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
    }, 'customer service' : {
      zh : '联系客服',
      en : 'Customer Service',
    }, 'Language' : {
      zh : 'Language / 更换语言',
      en : 'Language / 更换语言',
    }, 'Check Order' : {
      zh : '查阅订单',
      en : 'Check Order',
    },
  }


  news = [{photo : 'https://movie.en580.com/wp-content/uploads/2019/09/5.jpg' }]

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };


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
          // this.graphmax = Math.ceil(Math.max(...this.graph.map(a => a.amount)) / 100) * 100; //  get heighest amount ,round up to nearest 100
          this.vendor_ids = a;
          this.dataer(a);
        })
      } else {
        this.nav.navigateRoot('login', { animationDirection: 'back' })
      }
    })

  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  dataer(a) {

    this.http.post('https://hockwon.vsnap.my:3002/getvendortab5', { id: a.uid }).subscribe(a => {
      // let temp = [] as any;
      console.log(a)
      this.vendor = a['data'];
      console.log(this.vendor);


      })

      this.http.get('https://hockwon.vsnap.my:3002/merchatgetmerchantnews').subscribe(a => {
        // let temp = [] as any;
        console.log(a)
        this.news2 = a['data'];
        console.log(this.news2);
  
  
        })
    }
  

  pather(x) {
    this.nav.navigateForward(x);
  }

  what(){

    this.safariViewController.isAvailable()
  .then((available: boolean) => {
    if (available) {
      this.safariViewController.show({
        // url: JSON.parse(a['message']['body']).url,
        url: 'https://wa.me/60123810789?text=I%20Need%20Help',
        transition: 'curl',
        enterReaderModeIfAvailable: true,
      })
        .subscribe((result: any) => {
       
        },
          (error: any) => {
      
            // window.open(JSON.parse(a['message']['body']).url, '_tab')
            window.open('https://wa.me/60123810789?text=I%20Need%20Help', '_tab')
          }
        );

    } else {
 
      // window.open(JSON.parse(a['message']['body']).url, '_tab');
      window.open('https://wa.me/60123810789?text=I%20Need%20Help', '_tab')
    }
  }).catch(e => {

    // window.open(JSON.parse(a['message']['body']).url, '_tab');
    window.open('https://wa.me/60123810789?text=I%20Need%20Help', '_tab')
  });

  // this.nav.navigateForward('support')

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

  async result2(x) {
    // ?id=' + x.id + '&type=' + x.type + '&subject=' + x.type_id + "&scan=yes
    this.nav.navigateForward('fnb?id=' + x || 'vrNxbXvRogTOdn2d1FSXYQ0nDLJ3');
  }



}
