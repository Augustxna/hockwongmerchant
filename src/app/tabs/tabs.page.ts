import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { ServiceService } from '../service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(public storage: Storage, private platform: Platform, private fcm: FCM, private service: ServiceService,
    private toastController: ToastController, private nav: NavController) { }
  lang = 'en';

  select;
  firsttime = false;
  languager = false;

  language = {
    'Offline Merchant': {
      zh: '线下商家',
      en: 'Offline Merchant',
    }, 'Online Sales': {
      zh: '线上销售',
      en: 'Online Sales',
    }, 'Home': {
      zh: '主页',
      en: 'Home',
    }
  }

  ngOnInit() {
    this.service.getPop().subscribe(data => {
      this.languager = data
    });

    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        if (!this.platform.is('desktop') && !this.platform.is('mobileweb')) {
          this.fcm.subscribeToTopic('all');
          this.fcm.subscribeToTopic(a.uid);
          this.fcmNotification()
        } else {
          console.log(this.platform.platforms(), 'NO FCM');
        }
      }
    })
  }

  navto() {
    if (this.select > -1) {
      this.firsttime = false;
      this.nav.navigateForward(this.select == 0 ? 'tabs/tab6' : 'tabs/tab7');
    } else {
      swal({
        title: 'Please select one of the options',
        text: '请选择其中一个选项',
        icon: 'warning',
        timer: 2000,
        buttons: { OK: true }
      })
    }
  }

  selection(x) {
    // swal({
    //   title: (x ? 'Confirmation' : '确认'),
    //   text: (x ? 'Are you sure to select language?' : '是否确定选择语言'),
    //   closeOnEsc: false,
    //   closeOnClickOutside: false,
    //   buttons: (x ? { Cancel: true, Confirm: true } : { 取消: true, 确定: true })
    // }).then(ans => {
    //   if (ans == 'Confirm' || ans == '确定') {
        this.storage.set('lang', (x ? 'en' : 'zh'));
        this.languager = false;
        this.firsttime = true;
        // this.nav.pop();
        // this.nav.navigateRoot('tabs/tab1');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 500);
    //   }
    // })
  }

  async presentToastWithOptions(header, msg, id, path) {

    const toast = await this.toastController.create({
      header: header,
      message: msg,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: 'Go',
          handler: () => {
            this.nav.navigateForward(path);
          }
        }
      ]
    });
    toast.present();
  }

  fcmNotification() {
    this.fcm.onNotification().subscribe(async data => {
      if (data.wasTapped) {
        setTimeout(() => {
          this.nav.navigateForward(data.path);
        }, 2000);
      }
      else {
        this.presentToastWithOptions(data.title, data.message, data.id, data.path)
      }
    })
  }
}
