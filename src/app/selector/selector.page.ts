import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.page.html',
  styleUrls: ['./selector.page.scss'],
})
export class SelectorPage implements OnInit {

  constructor(private modalController: ModalController, private navparam: NavParams, public storage: Storage) { }
  array = [] as any;
  keyword = '';
  lang = 'en';
  language = {
    'Search': {
      zh: '查询',
      en: 'Search',
    }
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });
    this.array = this.navparam.get('array')
    console.log(this.array);
  }

  filterer(x) {
    return x ? this.array.filter(a => (((a || '')).toLowerCase()).includes((this.keyword).toLowerCase())) : [];
  }
  done(x) {
    this.modalController.dismiss({
      value: x
    });
  }

  back() {
    this.modalController.dismiss();
  }
}