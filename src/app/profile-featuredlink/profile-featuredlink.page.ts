import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import swal from 'sweetalert';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile-featuredlink',
  templateUrl: './profile-featuredlink.page.html',
  styleUrls: ['./profile-featuredlink.page.scss'],
})
export class ProfileFeaturedlinkPage implements OnInit {

  constructor(private route: ActivatedRoute, public nav: NavController, public storage: Storage,
    public alertController: AlertController, public safariViewController: SafariViewController) { }

  voucher = {} as any;
  selected = [] as any;
  vendor = {} as any;
  vendor_acc = {} as any;
  lang = 'en';
  language = {
    'Product Featured URLs': {
      zh: '商品精选链接',
      en: 'Product Featured URLs',
    }, 'Preview': {
      zh: '预览',
      en: 'Preview',
    }, 'Edit': {
      zh: '编辑',
      en: 'Edit',
    }, 'Delete': {
      zh: '删除',
      en: 'Delete',
    }, 'Add New Featured URL': {
      zh: '添加新精选链接',
      en: 'Add New Featured URL',
    }, 'UPDATE CHANGES': {
      zh: '更新改动',
      en: 'UPDATE CHANGES',
    }, 'Enter featured URL information': {
      zh: '输入精选链接详情',
      en: 'Enter featured URL information',
    }, 'Button Name': {
      zh: '按钮名字',
      en: 'Button Name',
    }, 'Featured URL': {
      zh: '精选链接',
      en: 'Featured URL',
    }, 'Cancel': {
      zh: '取消',
      en: 'Cancel',
    }, 'Update': {
      zh: '更新',
      en: 'Update',
    }, 'Delete Featured URL': {
      zh: '删除精选链接',
      en: 'Delete Featured URL',
    }, 'All information within will be removed. Are you sure?': {
      zh: '所有资料将被移除,是否继续?',
      en: 'All information within will be removed. Are you sure?',
    },
  }

  back() {
    this.nav.pop();
  }

  previewtype(x) {

    this.safariViewController.isAvailable()
      .then((available: boolean) => {
        if (available) {

          this.safariViewController.show({
            url: x,
          })
            .subscribe((result: any) => {
              if (result.event === 'opened') console.log('Opened');
              else if (result.event === 'loaded') console.log('Loaded');
              else if (result.event === 'closed') console.log('Closed');
            },
              (error: any) => {
                window.open(x, '_blank')
              }
            );

        } else {
          window.open(x, '_blank')
          // use fallback browser, example InAppBrowser
        }
      }
      ).catch(e => {
        window.open(x, '_blank')
      })

  }

  async editvar(i) {
    const alert = await this.alertController.create({
      header: "Edit Featured URL",
      subHeader: 'Enter featured URL information',
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.selected[i].name,
          placeholder: 'Button Name'
        },
        {
          name: 'link',
          type: 'text',
          value: this.selected[i].link,
          placeholder: 'Featured URL'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('确定 取消');
          }
        },
        {
          text: 'Update',
          handler: (data) => {

            if (data['name'] && data['link']) {
              this.selected[i] = { name: (data['name'] || "Not Set"), link: (data['link'] || "N/A") };
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

  async addvar() {
    const alert = await this.alertController.create({
      header: this.language["Add New Featured URL"][this.lang],
      subHeader: this.language['Enter featured URL information'][this.lang],
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.language['Button Name'][this.lang]
        },
        {
          name: 'link',
          type: 'text',
          placeholder: this.language['Featured URL'][this.lang]
        },
      ],
      buttons: [
        {
          text: this.language['Cancel'][this.lang],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('确定 取消');
          }
        },

        {
          text: this.language['Update'][this.lang],
          handler: (data) => {

            if (data['name'] && data['link']) {
              this.selected.push(
                {
                  link: (data['link'] || "N/A"),
                  name: (data['name'] || "Not Set"),
                }
              )
            }



          }
        }
      ]
    });

    await alert.present();
  }

  deltype(i) {

    let buttons = {
      取消: {
        name: "Cancel 取消",
        value: "取消",
      },

      确定: {
        name: "Confirm 确定",
        value: "确定",
      },
    }

    swal({
      title: this.language["Delete Featured URL"][this.lang],
      text: this.language["All information within will be removed. Are you sure?"][this.lang],
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {

            this.selected.splice(i, 1);

          } else {

          }
        } else {

        }

      });
  }

  checkinclude(x) {
    return this.selected.includes(x);
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.voucher = params.voucher
      this.selected = [].concat(params.selected || [])
      console.log(this.selected)
      // vendor={} as any;
      // vendor_acc={} as any;
      this.vendor = params.vendor
      this.vendor_acc = params.vendor_acc
    });
  }

  done() {
    this.voucher['link'] = this.selected;
    this.back();
  }


}
