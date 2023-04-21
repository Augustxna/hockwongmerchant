import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import swal from 'sweetalert';
import { SupportEditPage } from '../support-edit/support-edit.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.page.html',
  styleUrls: ['./support-list.page.scss'],
})
export class SupportListPage implements OnInit {

  constructor(private nav: NavController, private http: HttpClient, public storage: Storage,
    private actRoute: ActivatedRoute, private modalController: ModalController) { }

  tickets = [] as any;
  lang = 'en';
  language = {
    'My Ticket': {
      zh: '我的辅助券',
      en: 'My Ticket',
    },'Create': {
      zh: '建创',
      en: 'Create',
    },'No Content': {
      zh: '什么都没有',
      en: 'No Content',
    },'There are no items in this list.': {
      zh: '列表什么也没有',
      en: 'There are no items in this list.',
    },'Create one support ticket now': {
      zh: '建创辅助券',
      en: 'Create one support ticket now',
    },'No Title': {
      zh: '没有题目',
      en: 'No Title',
    },'Support replied': {
      zh: '辅助已回复',
      en: 'Support replied',
    },'Waiting for reply': {
      zh: '等待回复',
      en: 'Waiting for reply',
    },'Create on': {
      zh: '建创于',
      en: 'Create on',
    }
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.actRoute.queryParams.subscribe(() => {
          this.http.post('https://hockwon.vsnap.my:3002/getsomesupports', { id: a.uid }).subscribe((s) => {
            console.log(s['data']);
            this.tickets = s['data'];
          });
        })
      }
    })

  }

  lengthof(x) {
    return x ? Object.keys(x || {}).length : 0
  }

  back() {
    this.nav.pop();
  }

  create() {
    this.nav.navigateForward('support-create');
  }

  async next(x) {
    // this.nav.navigateForward('support-edit?id=' + x.id)
    const modal = await this.modalController.create({
      component: SupportEditPage,
      componentProps: { data: x }
    });

    await modal.present();
  }
}
