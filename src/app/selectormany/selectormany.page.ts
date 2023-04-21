import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-selectormany',
  templateUrl: './selectormany.page.html',
  styleUrls: ['./selectormany.page.scss'],
})
export class SelectormanyPage implements OnInit {

  constructor(private modalController: ModalController, private navparam: NavParams, public storage: Storage,) { }

  array = [] as any;
  selected = [] as any;;
  lang = 'en';
  language = {
    'UPDATE': {
      zh: '更新',
      en: 'UPDATE',
    }
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });
    this.array = this.navparam.get('array')
    this.selected = this.navparam.get('selected');
  }

  checkinclude(x) {
    return this.selected.includes(x);
  }

  unchecker() {
    if (this.selected.length == this.array.length) {
      this.selected = [];
    } else {
      this.selected = [];
      this.array.filter(a => this.selected.push(a))
    }
  }

  save(x) {
    (this.checkinclude(x) == true && this.selected.length > 0) ? this.selected.splice(this.selected.indexOf(x), 1) : this.selected.push(x)
  }

  done() {
    this.modalController.dismiss({
      value: this.selected
    });
  }

  back() {
    this.modalController.dismiss();
  }
}