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
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  constructor(public datepipe: DatePipe,
    public nav: NavController,
    private http: HttpClient,

    public storage: Storage,
    private modalController: ModalController,
    private actRoute: ActivatedRoute,
    public barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    private fcm: FCM,) { }


    id = null
  vendor_ids = {} as any;;

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
    }, 'First Step: Set Merchant Information' : {
      zh : '第一步： 设置商家资料',
      en : 'First Step: Set Merchant Information',
    }, 'Merchant Information' : {
      zh : '商家资料',
      en : 'Merchant Information',
    }, 'Delivery Setting' : {
      zh : '邮寄设置',
      en : 'Delivery Setting',
    }, 'Self-Collection Setting' : {
      zh : '自取点设置',
      en : 'Self-collection Setting',
    },'Second Step: Listing Product' : {
      zh : '第二步：上架商品（商品上架后需被审核）',
      en : 'Second Step: Listing Product',
    }, 'Create Product' : {
      zh : '创建商品',
      en : 'Create Product',
    }, 'Pending Review' : {
      zh : '待审核',
      en : 'Pending Review',
    }, 'Listed Product' : {
      zh : '已上架商品',
      en : 'Listed Product',
    },'Third Step: Check Order' : {
      zh : '第三步：检查订单',
      en : 'Third Step: Check Order',
    }, 'New Order' : {
      zh : '新订单',
      en : 'New Order',
    }, 'In Transit' : {
      zh : '邮寄中',
      en : 'In Transit',
    }, 'Completed' : {
      zh : '已完成订单',
      en : 'Completed',
    }, 'Withdraw' : {
      zh : '取出金额',
      en : 'Withdraw',
    },
  }

  news = [{photo : 'https://movie.en580.com/wp-content/uploads/2019/09/5.jpg' }]

  ngOnInit() {

    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {

        console.log(a.uid)
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
    }

  pather(x) {
    this.nav.navigateForward(x);
  }

  doRefresh(a){

    this.dataer(this.vendor_ids)
    a.target.complete()

  }

}
