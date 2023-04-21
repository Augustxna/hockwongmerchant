import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import swal from 'sweetalert';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  language = 'en';
  old;
  constructor(public nav: NavController, public storage: Storage) { }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        if (data == 'zh' || data == 'en') {
          this.language = data;
          this.old = data;
          console.log(this.language);
        }
      })
    });
  }

  action() {
    setTimeout(() => {
      if (this.language != this.old) {
        swal({
          title: (this.language == 'en' ? 'Confirmation' : '确认'),
          text: (this.language == 'en' ? 'Are you sure to change language?' : '是否确定更改语言'),
          closeOnEsc: false,
          closeOnClickOutside: false,
          buttons: (this.language == 'zh' ? { 取消: true, 确定: true } : { Cancel: true, Confirm: true })
        }).then(ans => {
          if (ans == 'Confirm' || ans == '确定') {
            this.storage.set('lang', this.language);
            this.nav.pop();
            // this.nav.navigateRoot('tabs/tab1');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            this.language = (this.language == 'zh' ? 'en' : 'zh')
            console.log('do nothing')
          }
        })
      }
    }, 100);

  }

  back() {
    this.nav.pop();
  }

}
