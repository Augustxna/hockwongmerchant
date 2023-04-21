import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import * as EXIF from 'exif-js';
import firebase from 'firebase';
import swal from 'sweetalert';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-variations',
  templateUrl: './product-variations.page.html',
  styleUrls: ['./product-variations.page.scss'],
})
export class ProductVariationsPage implements OnInit {

  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private navparam: NavParams,
    private http: HttpClient,
    public storage: Storage,
  ) { }

  voucher = {} as any;
  selected = [] as any;
  vardetail = {} as any;
  vendor = {} as any;
  vendor_acc = {} as any;
  imagec
  imagectype
  base64img
  lang = 'en';
  language = {
    'Product Variations': {
      zh: '商品类别',
      en: 'Product Variations',
    }, 'Delete': {
      zh: '删除',
      en: 'Delete',
    }, 'Add': {
      zh: '添加',
      en: 'Add',
    }, 'Add New Variation': {
      zh: '添加新的类别',
      en: 'Add New Variation',
    }, 'Product Information': {
      zh: '商品详情',
      en: 'Product Information',
    }, 'SKU': {
      zh: '库存单位',
      en: 'SKU',
    }, 'Enter': {
      zh: '输入',
      en: 'Enter',
    }, 'Retail Price': {
      zh: '零售价',
      en: 'Retail Price',
    }, 'Whole Price': {
      zh: '批货价',
      en: 'Wholesale Price',
    }, 'Weight(g)': {
      zh: '重量(克)',
      en: 'Weight(g)',
    }, 'Quantity': {
      zh: '数量',
      en: 'Quantity',
    }, 'UPDATE CHANGES': {
      zh: '更新改动',
      en: 'UPDATE CHANGES',
    }
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    let array = this.navparam.get('data')

    console.log(array)
    this.selected = this.navparam.get('variation') || [{ name: "Enter Variation", selections: [{ name: 'Edit Me' }] }]
    console.log(this.selected)

    this.vardetail = array ? array.reduce((a, b) => ({ ...a, [b.array]: b }), {}) : [{
      name: "Enter Variation : Edit Me",
      sku: null,
      price_now: 0,
      price_retail: 0,
      qty: 0,
      weight: 0,
      array: '0'
    }];
  }

  back() {
    this.modalController.dismiss();
  }

  async edittype(i) {
    const alert = await this.alertController.create({
      header: "Edit Variation",
      subHeader: 'Edit variation name',
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.selected[i].name,
          placeholder: 'Seletion Name'
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
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data['name']) {
              this.selected[i].name = (data['name'] || "Not Set");
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async addvar(i) {
    const alert = await this.alertController.create({
      header: this.selected[i].name + "'s Selection",
      subHeader: 'Add selection',
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Seletion Name'
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
        },
        {
          text: 'Update',
          handler: (data) => {
            if (data['name']) {
              this.selected[i].selections.push(
                {
                  name: (data['name'] || "Not Set"),
                }
              )
              if (this.selected.length >= 1) {
                for (let i = 0; i < this.selected[0].selections.length; i++) {
                  if (!this.vardetail[i]) {
                    this.vardetail[i] = ({
                      name: (this.selected[0].name + " : " + this.selected[0].selections[i].name),
                      sku: null,
                      price_now: 0,
                      price_retail: 0,
                      qty: 0,
                      weight: 0,
                      array: i.toString()
                    } as any)
                  }
                }
              }

              if (this.selected.length >= 2) {
                for (let i = 0; i < this.selected[0].selections.length; i++) {
                  for (let j = 0; j < this.selected[1].selections.length; j++) {
                    if (!this.vardetail[i.toString() + j]) {
                      this.vardetail[i.toString() + j] = ({
                        name: (this.selected[0].name + " : " + this.selected[0].selections[i].name + ', ' +
                          this.selected[1].name + " : " + this.selected[1].selections[j].name),
                        sku: null,
                        price_now: 0,
                        price_retail: 0,
                        qty: 0,
                        weight: 0,
                        array: i.toString() + j,
                      } as any)
                    }
                  }
                }
              }

              if (this.selected.length >= 3) {
                for (let i = 0; i < this.selected[0].selections.length; i++) {
                  for (let j = 0; j < this.selected[1].selections.length; j++) {
                    for (let k = 0; k < this.selected[2].selections.length; k++) {
                      if (!this.vardetail[i.toString() + j + k]) {
                        this.vardetail[i.toString() + j + k] = ({
                          name: (this.selected[0].name + " : " + this.selected[0].selections[i].name + ', ' + this.selected[1].name + " : " + this.selected[1].selections[j].name + ', ' +
                            this.selected[2].name + " : " + this.selected[2].selections[k].name),
                          sku: null,
                          price_now: 0,
                          price_retail: 0,
                          qty: 0,
                          weight: 0,
                          array: i.toString() + j + k,
                        } as any)
                      }
                    }
                  }
                }
              }
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async addtype() {
    const alert = await this.alertController.create({
      header: "New Variation",
      subHeader: 'Enter variation name',
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Seletion Name'
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
        },
        {
          text: 'Create',
          handler: (data) => {

            if (data['name']) {
              this.selected.push({
                name: (data['name'] || "Not Set"),
                selections: [],
              })
            }

          }
        }
      ]
    });

    await alert.present();
  }

  async editvar(i, j) {
    const alert = await this.alertController.create({
      header: this.selected[i].name + "'s Selection",
      subHeader: 'Edit selection',
      mode: "ios",
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: this.selected[i].selections[j].name,
          placeholder: 'Seletion Name'
        }
        // ,
        // {
        //   name: 'price',
        //   type: 'number',
        //   value: this.proper2(this.selected[i].selections[j].price),
        //   placeholder: 'Selection Price (RM)'
        // },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let buttons = {
              Cancel: {
                name: "Cancel",
                value: "Cancel",
              },

              Confirm: {
                name: "Confirm",
                value: "Confirm",
              },
            }

            swal({
              title: "Delete Selection",
              text: "Are you sure?",
              icon: 'warning',
              buttons: buttons,
              // dangerMode: true,
            })
              .then((value) => {
                if (value != "") {
                  if (value == "Confirm") {

                    this.selected[i].selections.splice(j, 1);

                  } else {

                  }
                } else {

                }

              });
          }
        },
        {
          text: 'Update',
          handler: (data) => {
            console.log(data);

            if (data['name']) {
              this.selected[i].selections[j] = { name: (data['name'] || "Not Set") };
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

  deltype(i) {

    let buttons = {
      Cancel: {
        name: "Cancel",
        value: "Cancel",
      },

      Confirm: {
        name: "Confirm",
        value: "Confirm",
      },
    }

    swal({
      title: "Delete Variation",
      text: "All selections will be removed. Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "Confirm") {
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

  fileChange2(event, maxsize, x) {
    console.log(x);

    if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
      this.imagectype = event.target.files[0].type;
      EXIF.getData(event.target.files[0], () => {
        const orientation = EXIF.getTag(this, 'Orientation');
        const can = document.createElement('canvas');
        const ctx = can.getContext('2d');
        const thisImage = new Image;
        const maxW = maxsize;
        const maxH = maxsize;
        thisImage.onload = (a) => {
          const iw = thisImage.width;
          const ih = thisImage.height;
          const scale = Math.min((maxW / iw), (maxH / ih));
          const iwScaled = iw * scale;
          const ihScaled = ih * scale;
          can.width = iwScaled;
          can.height = ihScaled;
          ctx.save();
          const width = can.width; const styleWidth = can.style.width;
          const height = can.height; const styleHeight = can.style.height;
          console.log(event.target.files[0]);
          if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
            if (event.target.files[0].exifdata.Orientation > 4) {
              can.width = height; can.style.width = styleHeight;
              can.height = width; can.style.height = styleWidth;
            }
            switch (event.target.files[0].exifdata.Orientation) {
              case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
              case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
              case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
              case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
              case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
              case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
              case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
            }
          }
          ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
          ctx.restore();
          this.imagec = can.toDataURL();
          const imgggg = this.imagec.replace(';base64,', 'thisisathingtoreplace;');
          const imgarr = imgggg.split('thisisathingtoreplace;');
          this.base64img = imgarr[1];
          event.target.value = '';
          eval(x + "= 'https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif'")
          // this.uploadToImgur(x);
          this.http.post('https://img.vsnap.my/upload', { image: this.imagec, folder: 'hockwong', userid: 'hockwongvendor' }).subscribe((link) => {
            eval(x + "=link['imageURL']")
          })

        };
        thisImage.src = URL.createObjectURL(event.target.files[0]);
      });
    } else {
      swal.close();
      alert('Your Current Image Too Large, ' + event.target.files[0].size / (10241024) + 'MB! (Please choose file lesser than 8MB)');
    }
    // } else {
    //   swal({
    //     icon: 'error',
    //     title: 'No Authority',
    //     text: 'Your account has no authority to edit photo',
    //     // closeOnEsc: false,
    //     // closeOnClickOutside: false,
    //     buttons: [false],
    //     timer: 1500
    //   });
    // }

  }

  done() {

    if (this.selected.length >= 1) {
      for (let i = 0; i < this.selected[0].selections.length; i++) {
        if (this.vardetail[i]) {
          this.vardetail[i].name = (this.selected[0].name + ": " + this.selected[0].selections[i].name);
          this.vardetail[i].eldercode = this.vardetail[i].eldercode ? this.vardetail[i].eldercode : 'ss';
        }
      }
    }

    if (this.selected.length >= 2) {
      for (let i = 0; i < this.selected[0].selections.length; i++) {
        for (let j = 0; j < this.selected[1].selections.length; j++) {
          if (this.vardetail[i.toString() + j]) {
            this.vardetail[i.toString() + j].name = (this.selected[0].name + ": " + this.selected[0].selections[i].name + ', ' +
              this.selected[1].name + ": " + this.selected[1].selections[j].name);
            this.vardetail[i.toString() + j].eldercode = this.vardetail[i.toString() + j].eldercode ? this.vardetail[i.toString() + j].eldercode : 'ss';
          }
        }
      }
    }

    if (this.selected.length >= 3) {
      for (let i = 0; i < this.selected[0].selections.length; i++) {
        for (let j = 0; j < this.selected[1].selections.length; j++) {
          for (let k = 0; k < this.selected[2].selections.length; k++) {
            if (this.vardetail[i.toString() + j + k]) {
              this.vardetail[i.toString() + j + k].name =
                (this.selected[0].name + ": " + this.selected[0].selections[i].name + ', ' + this.selected[1].name + ": " + this.selected[1].selections[j].name + ', ' +
                  this.selected[2].name + ": " + this.selected[2].selections[k].name);
              this.vardetail[i.toString() + j + k].eldercode = this.vardetail[i.toString() + j + k].eldercode ? this.vardetail[i.toString() + j + k].eldercode : 'ss';
            }
          }
        }
      }
    }

    let temp = Object.values(this.vardetail).filter(a =>
      a['array'].length == this.selected.length
      && a['array'][0] < this.selected[0].selections.length
      && (this.selected[1] ? a['array'][1] < this.selected[1].selections.length : true)
      && (this.selected[2] ? a['array'][2] < this.selected[2].selections.length : true)
    );

    let temp2 = this.selected.filter(a => this.lengthof(a['selections']));
    console.log(temp);

    const arry = temp.map(a => a['sku']);
    const toFindDuplicates = arry => arry.filter((item, index) => arry.indexOf(item) !== index)
    const duplicateElements = toFindDuplicates(arry);
    console.log(duplicateElements);

    if (!this.lengthof(duplicateElements)) {
      if (temp.every(a => a['sku'] && a['price_now'] && a['price_retail'] && a['weight'])) {
        this.modalController.dismiss({
          value: temp,
          value2: temp2,
        });
      } else {
        swal({
          icon: 'error',
          title: 'Incomplete Information',
          text: 'Please make sure you have at least one selection in each of your variations.',
          buttons: [false],
          timer: 2000
        });
      }
    } else {
      swal({
        icon: 'error',
        title: 'Duplicated SKU',
        text: 'System found duplicated SKU in the product list, please make sure all the SKU is unique.',
        buttons: [false],
        timer: 2000
      });
    }
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

}
