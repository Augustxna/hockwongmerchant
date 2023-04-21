import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import firebase from 'firebase';
import { DeliveryCreatePage } from '../delivery-create/delivery-create.page';
import { DeliveryDetailPage } from '../delivery-detail/delivery-detail.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})
export class DeliveryListPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private nav: NavController,
    private http: HttpClient,
    public storage: Storage,
    // private bento: BentoService,
  ) { }

  sets = [] as any;

  lang = 'en';
  language = {
    'Delivery Settings': {
      zh: '邮递设置',
      en: 'Delivery Settings',
    },'Minimum Custom Delivery': {
      zh: '最小客化邮寄',
      en: 'Minimum Custom Delivery',
    },'Custom Delivery Fee': {
      zh: '客化邮寄费用',
      en: 'Custom Delivery Fee',
    },'Create New Entry': {
      zh: '创建新条目',
      en: 'Create New Entry',
    },
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      this.http.post('https://hockwon.vsnap.my:3002/getdelivery', { vendor_id: a.uid }).subscribe((a) => {
        this.sets = a['data']
      });
    });
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  async create() {

    let states = []
    this.lengthof(this.sets) ? this.sets.filter(a => { states = states.concat(a['state']) }) : null

    console.log(states)
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: DeliveryCreatePage,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        existing_state: states,
      },
    });
    await modal.present();

    modal.onDidDismiss().then((ret) => {
      if (ret.data) {
        this.sets.push(ret.data)
      }
    })

  }

  // async edit(i) {

  //   let states = []
  //   // let names = []
  //   this.lengthof(this.sets) > 1 ? this.sets.filter((a, index) => { index != i ? states = states.concat(a['state']) : null }) : null
  //   // this.lengthof(this.sets) ? this.sets.filter((a,index) => { index != i ? names = names.concat(a['name']) : null }) : null
  //   console.log(states)
  //   // const modal: HTMLIonModalElement = await this.modalController.create({
  //   //   cssClass: 'create-modal',
  //   //   component: DeliveryeditPage,
  //   //   mode: 'ios',
  //   //   backdropDismiss: false,
  //   //   componentProps: {
  //   // existing_state:  states,
  //   // existing_name : names
  //   //   },
  //   // });
  //   // await modal.present();

  //   // modal.onDidDismiss().then((ret) => {
  //   //   if (ret.data) {
  //   //     this.sets[i] = ret.data
  //   //   }
  //   // })

  // }

  async edit(i) {

    let states = []
    // let names = []
    this.lengthof(this.sets) > 1 ? this.sets.filter((a, index) => { index != i ? states = states.concat(a['state']) : null }) : null
    // this.lengthof(this.sets) ? this.sets.filter((a,index) => { index != i ? names = names.concat(a['name']) : null }) : null
    console.log(states)

    const modal: HTMLIonModalElement = await this.modalController.create({
      component: DeliveryDetailPage,
      mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        existing_state: JSON.parse(JSON.stringify(states)),
        data: JSON.parse(JSON.stringify(this.sets[i])),
        // existing_name: names
      },
    });

    await modal.present();

    modal.onDidDismiss().then((ret) => {
      console.log(ret.data);

      if (ret.data == 'back') {
      } else if (ret.data) {
        this.sets[i] = ret.data
      } else {
        this.sets.splice(i, 1);
      }
    })

  }

  back() {
    this.nav.pop();
  }

}
