import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController , AlertController } from '@ionic/angular';
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
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {

  constructor(public datepipe: DatePipe,
    public nav: NavController,
    private http: HttpClient,

    public storage: Storage,
    private modalController: ModalController,
    private actRoute: ActivatedRoute,
    public barcodeScanner: BarcodeScanner,
    private androidPermissions: AndroidPermissions,
    private safariViewController: SafariViewController,
    private alertController : AlertController,
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
        zh: '余额',
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
      }, 'First Step: Set Merchant Information & Share Profit' : {
        zh : '第一步： 设置商家资料&让利',
        en : 'First Step: Set Merchant Information & Share Profit',
      }, 'Merchant Information' : {
        zh : '商家资料',
        en : 'Merchant Information',
      }, 'Merchant Address' : {
        zh : '商家地址',
        en : 'Merchant Address',
      }, 'Merchant Share Profit' : {
        zh : '商家让利',
        en : 'Merchant Share Profit',
      },'Second Step: Add Restaurant Feature & Service' : {
        zh : '第二步：添加餐厅菜色，服务项目等',
        en : 'Second Step: Add Restaurant Feature & Service',
      }, 'Start to Add' : {
        zh : '+  开始添加',
        en : '+  Start to Add',
      },'Third Step: Contact Customer Service After Top Up' : {
        zh : '第三步：充值余额后联系客服',
        en : 'Third Step: Contact Customer Service After Top Up',
      }, 'Top Up' : {
        zh : '充值',
        en : 'Top Up',
      }, 'Scan History' : {
        zh : '扫码记录',
        en : 'Scan History',
      }, 'Scan QR Code' : {
        zh : '扫描二维码',
        en : 'Scan QR Code',
      },'Pending Review' : {
        zh : '待审核',
        en : 'Pending Review',
      },'Please contact customer service for verification and account activation after top up' : {
        zh : '充值后请联系客服审核并开通账号',
        en : 'Please contact customer service for verification and account activation after top up',
      },'Customer Service' : {
        zh : '联系客服',
        en : 'Customer Service',
      },
      'Verified' : {
        zh : '通过审核',
        en : 'Verified',
      },
    }

  
    news = [{photo : 'https://movie.en580.com/wp-content/uploads/2019/09/5.jpg' }]

    categories2 = [
      { photo: "https://assets1.lottiefiles.com/packages/lf20_uDilo5.json", name_en: "Customer Service",name_zh: "联系客服", path: 'chat-list' },
    ]
  

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
          this.vendor.physical_rate = this.vendor.physical_rate ? this.vendor.physical_rate * 100 : 0
    
          })
        
  
      // this.http.post('https://hockwon.vsnap.my:3002/venddortab1', { id: a.uid }).subscribe(a => {
      //   let temp = [] as any;
      //   console.log(a)
      //   this.vendor = a['vendor'];
      //   console.log(this.vendor);
  
      //   if (this.lengthof(a['sales'])) {
      //     Object.values(a['sales'][0]).reverse().forEach((element, i) => {
      //       temp.push({ name: this.datepipe.transform( new Date().getTime() - ((this.lengthof(a['sales'][0]) - 1 - i) * 86400000) , 'dd MMM'), amount: element })
      //     });
  
      //     // this.graph = temp;
  
      //     // console.log(this.graph)
      //     // this.graphmax = Math.ceil(Math.max(...this.graph.map(a => a.amount)) / 100) * 100; 
  
      //   }
      // })
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

    addmenu(){

      this.nav.navigateForward('newmenulist')

    }

   async merchantrebate(x){

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: this.language["Merchant Share Profit"][this.lang],
          inputs: [
            {
              name: 'cat',
              type: 'number',
              placeholder: this.language["Merchant Share Profit"][this.lang],
              value: x,
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            }, {
              text: 'Ok',
              handler: (data) => {
    
                if(data.cat){
    
                  this.http.post('https://hockwon.vsnap.my:3002/updatevendors', {id : this.vendor.id,  physical_rate:( this.proper2(data.cat / 100) || 0)}).subscribe(a =>{


                    console.log(a)
                    this.vendor.physical_rate = this.proper2(data.cat ) || 0

                  })
    
                }
          
              }
            }
          ]
        });
    
        await alert.present();
      

    }

    proper2(x) {
      return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
    }

    doRefresh(a){

      this.dataer(this.vendor_ids)
      a.target.complete()
  
    }
}
