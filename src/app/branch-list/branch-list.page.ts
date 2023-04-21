import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonRouterOutlet, ModalController, NavController } from '@ionic/angular';
import swal from 'sweetalert';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import firebase from 'firebase';
import { BranchEditPage } from '../branch-edit/branch-edit.page';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.page.html',
  styleUrls: ['./branch-list.page.scss'],
})
export class BranchListPage implements OnInit {

  constructor(private route: ActivatedRoute, public nav: NavController, public storage: Storage, private http: HttpClient,
    public modal: ModalController, public routerOutlet: IonRouterOutlet) { }

  lang = 'en';
  language = {
    'My Branch': {
      zh: '商家地址',
      en: 'Merchant Address',
    }, 'Create New Outlet': {
      zh: '添加新地址',
      en: 'Add New Address',
    }, 'No Content': {
      zh: '什么都没有',
      en: 'No Content',
    }, 'Nothing in the list': {
      zh: '列表什么都没有',
      en: 'Nothing in the list',
    },
  }

  back() {
    this.nav.pop();
  }

  addnewproduct() {
    this.nav.navigateForward('branch-create');
  }

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  async godetail(x) {
    console.log(x);

    const modal = await this.modal.create({
      component: BranchEditPage,
      componentProps: { value: x }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data == 1) {
      this.http.post('https://hockwon.vsnap.my:3002/datavendoraccs', { id: this.vendor.vendor_id }).subscribe(a => {
        this.vendor_accs = a['data'] || [];
        console.log(a);
      })
    }
  }

  lengthof2(x) {
    return (x ? Object.keys(x).length : 0)
  }

  vendor = {} as any;
  vendor_acc = {} as any;
  vendor_accs = [] as any;

  ngOnDestroy() {
    console.log('Destroying 16 BranchList')
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {

      this.route.queryParams.subscribe(() => {
        this.http.post('https://hockwon.vsnap.my:3002/getvendoracc', { id: a.uid }).subscribe(a => {
          this.vendor = a['data'][0] || [];
          console.log(a);

          this.http.post('https://hockwon.vsnap.my:3002/datavendoraccs', { id: this.vendor.vendor_id }).subscribe(a => {
            this.vendor_accs = a['data'] || [];
            console.log(a);
          })
        })
      })

    })

  }

}
