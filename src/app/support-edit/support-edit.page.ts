import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-support-edit',
  templateUrl: './support-edit.page.html',
  styleUrls: ['./support-edit.page.scss'],
})
export class SupportEditPage implements OnInit {

  constructor(public nav: NavController, private navparam: NavParams, private modalController: ModalController,
    private platform: Platform, public storage: Storage,) { }

  item = [] as any;
  lang = 'en';
  language = {
    'CLOSE': {
      zh: '关闭',
      en: 'CLOSE',
    },'Created on': {
      zh: '建创于',
      en: 'Created on',
    },'Support Response': {
      zh: '辅助的回复',
      en: 'Support Response',
    },'Responded on': {
      zh: '回复于',
      en: 'Responded on',
    },'No Content': {
      zh: '什么都没有',
      en: 'No Content',
    },'Support havent respond this ticket': {
      zh: '辅助还没回复这个卷',
      en: 'Support haven\'t respond this ticket',
    }
  }

  widtherget() {
    return this.platform.width();
  }

  highlightphoto;
  close2 = false;
  start = false;

  closeslide() {
    this.close2 = this.close2 == false ? true : false
    console.log(this.close2)
  }

  presser(x) {
    this.highlightphoto = x;
    this.close2 = true;
  }

  rounder(x) {
    return Math.floor(x);
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    this.item = this.navparam.get('data')
    this.item.photo = this.item.photo || [];
    
    // this.actRoute.queryParams.subscribe(b => {

    //   console.log(b);

    //   this.bento.getsupports().subscribe(a => {
    //     console.log(a);
    //     this.item = a.filter(x => x.id == b['id'])[0];
    //     this.item.photo = this.item.photo ? JSON.parse(this.item.photo) : [];
    //   });
    // })
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

  back() {
    // this.nav.back();
    this.modalController.dismiss()
  }

}
