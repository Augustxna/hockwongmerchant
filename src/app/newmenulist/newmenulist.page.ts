import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonReorderGroup, IonRouterOutlet, ModalController, NavController, Platform } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import firebase from 'firebase';
import swal from 'sweetalert';
import { MenuCreatePage } from '../menu-create/menu-create.page';
import { Storage } from '@ionic/storage';
import { PopCustomPage } from '../pop-custom/pop-custom.page';


@Component({
  selector: 'app-newmenulist',
  templateUrl: './newmenulist.page.html',
  styleUrls: ['./newmenulist.page.scss'],
})
export class NewmenulistPage implements OnInit {

  constructor(public http: HttpClient, public platform: Platform, public storage: Storage, private alertController: AlertController,
    public modal: ModalController, public routerOutlet: IonRouterOutlet, public nav: NavController) { }

  categories = [] as any;
  products = [] as any;
  vendor_acc = {} as any;
  lang = 'en';
  vendor = {} as any;
  language = {
    'E-Menu': {
      zh: '电子目录',
      en: 'E-Menu',
    }, 'Save': {
      zh: '储存',
      en: 'Save',
    }, 'New Category': {
      zh: '添加新分类',
      en: 'Add New Category',
    }, 'Delete': {
      zh: '删除',
      en: 'Delete',
    }, 'Change': {
      zh: '修改',
      en: 'Change',
    }, 'SKU': {
      zh: '产品',
      en: 'SKU',
    }, 'No Content': {
      zh: '没有东西',
      en: 'No Content',
    }, 'Nothing in the list': {
      zh: '列表里面没有任何东西',
      en: 'Nothing in the list',
    }, 'Save Change': {
      zh: '储存修改',
      en: 'Save Change',
    }, 'Edit Name': {
      zh: '修改名字',
      en: 'Edit Name',
    }, 'Cancel': {
      zh: '取消',
      en: 'Cancel',
    }, 'Add Product': {
      zh: '添加产品/服务',
      en: 'Add Product/Service',
    }
  }

  edit = false


  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  async poper(x, y, z, x1, y1) {
    console.log(this.categories[x1])
    const modal = await this.modal.create({
      component: PopCustomPage,
      cssClass: 'pop',
      componentProps: {
        language: this.lang,
        input: y,
        title: x,
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      // this.justsavev()
      console.log(data);
      (z == 'delete' ? this.splicer(x1, y1.emenu) : ((this.categories[x1].name = data), setTimeout(() => this.updater(y1.emenu, data), 100)));
      // this.ngOnInit();
    }
  }

  updater(x, y) {
    this.http.post('https://hockwon.vsnap.my:3002/updatemenucat', { menu: x, name: y }).subscribe(a => {
      console.log(a);
    })
  }

  ngOnInit() {

    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://hockwon.vsnap.my:3002/dataVendorlogin', { userid: a.uid }).subscribe(a => {
          this.vendor = a['data'][0];
          this.vendor_acc = a['data'][1] || {};
          this.http.post('https://hockwon.vsnap.my:3002/getemenu', { id: this.vendor.id }).subscribe(a => {
            console.log(a['data'])
            this.categories = a['data'] || []
          })
        })
      }
    })

  }

  addcat() {

    this.categories.push({ vendor_id: this.vendor.id })

  }



  async updcat(x) {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Category',
      inputs: [
        {
          name: 'cat',
          type: 'text',
          placeholder: 'Category Name',
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

            if (data.cat) {

              this.categories.push({
                vendor_id: this.vendor.id,
                name: data.cat,
                products: []
              })

              this.justsavev()

            }

          }
        }
      ]
    });

    await alert.present();
  }

  async goprod(j, k, x) {
    this.routerOutlet.swipeGesture = false;
    const loginmodal = await this.modal.create({
      component: MenuCreatePage,
      componentProps: {
        'product': x || {},
        'category': j || "",
      }
    });
    await loginmodal.present();

    const { data } = await loginmodal.onDidDismiss()
    this.routerOutlet.swipeGesture = true;
    if (data) {
      if (data == 'delete') {
        console.log('delete');
        this.categories[k].products.splice(k, 1);
        this.justsavev()
      } else {
        if (k >= 0) {
          this.categories[k].products[k] = (data.product)
          this.justsavev()
        } else {
          this.categories[k].products.push(data.product)
          this.justsavev()
        }
      }
    }
  }

  back() {

    this.nav.pop()

  }

  saveaall() {
    let buttons = {
      取消: {
        name: "取消",
        value: "取消",
      },

      确定: {
        name: "确定",
        value: "确定",
      },
    }

    swal({
      title: "Update Menu",
      text: "Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == '确定') {
            swal({
              title: '请稍等',
              text: '处理中',
              buttons: [false],
              closeOnEsc: false,
              closeOnClickOutside: false,
            })
            console.log(this.categories)
            this.http.post('https://hockwon.vsnap.my:3002/insertemenu', this.categories).subscribe(a => {
              console.log(a)
              swal.close()

              swal({
                icon: 'success',
                title: 'Menu 更新成功',
                text: '谢谢！',
                buttons: [false],
                timer: 1500
              });
            }, e => {
              swal.close()
              swal({
                icon: 'error',
                title: 'Update Failed',
                text: 'Please try again',
                buttons: [false],
                timer: 1500
              });
            })

          }
        }
      })

  }

  splicer(x, y) {
    this.categories.splice(x, 1);
    this.http.post('https://hockwon.vsnap.my:3002/deleteemenu', { emenu: y }).subscribe(a => {
      console.log(a)
    });
  }

  justsavev() {

    this.http.post('https://hockwon.vsnap.my:3002/insertemenu', this.categories).subscribe(a => {
      console.log(a)
      //   swal.close()

      //   swal({
      //     icon: 'success',
      //     title: 'Menu 更新成功',
      //     text: '谢谢！',
      //     buttons: [false],
      //     timer: 1500
      //   });
      // }, e => {
      //   swal.close()
      //   swal({
      //     icon: 'error',
      //     title: 'Update Failed',
      //     text: 'Please try again',
      //     buttons: [false],
      //     timer: 1500
      //   });
    })

  }

}
