import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import * as EXIF from 'exif-js';
import firebase from 'firebase';
import swal from 'sweetalert';
import { ProductLinkPage } from '../product-link/product-link.page';
import { ProductVariationsPage } from '../product-variations/product-variations.page';
import { SelectorPage } from '../selector/selector.page';
import { SelectormanyPage } from '../selectormany/selectormany.page';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  constructor(private nav: NavController, private modalController: ModalController, private actRoute: ActivatedRoute, public storage: Storage,
    private http: HttpClient) { }

  voucher = {
    photo: [],
    delivery_duration: { early: 1, latest: null },
  } as any;

  lengthof(x) {
    return (x ? Object.keys(x).length : 0)
  }

  proper2(x) {
    return Math.round((parseFloat(x || 0) + Number.EPSILON) * 100) / 100
  }

  delphoto(i) {
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
      title: "Delete Photo",
      text: "Are you sure?",
      icon: 'warning',
      buttons: buttons,
      // dangerMode: true,
    })
      .then((value) => {
        if (value != "") {
          if (value == "确定") {

            this.voucher['photo'].splice(i, 1);

          } else {

          }
        } else {

        }

      });
  }

  categories = {} as any;
  locations = [] as any;
  delivery_method = ['Delivery (邮寄)', 'Self Collect (自取)'] as any;
  selected_method = [] as any;
  id;
  lang = 'en';
  language = {
    'PRODUCT DETAILS': {
      zh: '产品详情',
      en: 'PRODUCT DETAILS',
    }, 'Product Photo': {
      zh: '产品照片',
      en: 'Product Photo',
    }, 'Cover Photo': {
      zh: '封面照片',
      en: 'Cover Photo',
    }, 'Add Photo': {
      zh: '添加照片',
      en: 'Add Photo',
    }, 'Product Name (ZH)': {
      zh: '产品名字(中文)',
      en: 'Product Name (ZH)',
    }, 'Product Name (EN)': {
      zh: '产品名字(英文)',
      en: 'Product Name (EN)',
    }, 'Enter Product Name': {
      zh: '输入产平名字',
      en: 'Enter Product Name',
    }, 'Product Description (ZH)': {
      zh: '产品描述(中文)',
      en: 'Product Description (ZH)',
    }, 'Enter Product Description (ZH)': {
      zh: '输入产品描述(中文)',
      en: 'Enter Product Description (ZH)',
    }, 'Product Description (EN)': {
      zh: '产品描述(英文)',
      en: 'Product Description (EN)',
    }, 'Enter Product Description (EN)': {
      zh: '输入产品描述(英文)',
      en: 'Enter Product Description (EN)',
    }, 'Earliest Delivery (Day)': {
      zh: '最快到达(天)',
      en: 'Earliest Delivery (Day)',
    }, 'Latest Delivery (Day)': {
      zh: '最迟到达(天)',
      en: 'Latest Delivery (Day)',
    }, 'Enter Latest Delivery (Day)': {
      zh: '输入最迟到达(天)',
      en: 'Enter Latest Delivery (Day)',
    }, 'Variations': {
      zh: '选择/价格',
      en: 'Variation/Pricing',
    }, 'Enter Earliest Delivery (Day)': {
      zh: '输入最快到达(天)',
      en: 'Enter Earliest Delivery (Day)',
    }, 'Category': {
      zh: '类别',
      en: 'Category',
    }, 'combinations': {
      zh: ' 组合',
      en: ' combinations',
    }, 'Not Set': {
      zh: '没有设置',
      en: 'Not Set',
    }, 'Delivery': {
      zh: '邮寄',
      en: 'Delivery',
    }, 'Both': {
      zh: '全部',
      en: 'Both',
    }, 'Featured URL': {
      zh: '精选链接',
      en: 'Featured URL',
    }, 'PROCEED TO REVIEW': {
      zh: '提交审核',
      en: 'PROCEED TO REVIEW',
    }, 'types,': {
      zh: ' 类型, ',
      en: ' types, ',
    },'Retail Price': {
      zh: '零售价/市场价',
      en: 'Retail Price',
    },'Selling Price': {
      zh: '出售给平台的价格 ',
      en: 'Wholesale Price',
    },'Weight': {
      zh: '重量',
      en: 'Weight',
    },'Stock': {
      zh: '库存',
      en: 'Stock',
    },'Open Multi Variations Mode': {
      zh: '打开多价格设置模式',
      en: 'Open Multi Variations Mode',
    },'Fastest delivery/self-pickup time (days)': {
      zh: '最快发货/自取时间（天）',
      en: 'Fastest delivery/self-pickup time (days)',
    },'Product Status': {
      zh: '商品状态',
      en: 'Product Status',
    },'Active': {
      zh: '开启',
      en: 'Active',
    }, 'Inactive': {
      zh: '关闭',
      en: 'Inactive',
    }, 
  }

  switcher() {
    swal({
      icon: 'warning',
      title: (this.voucher.status ? 'Deactive' : 'Active') + ' Product?',
      text: 'This will make change to the product instantly, are you sure?',
      buttons: { Cancel: true, Confirm: true },
    }).then((ans) => {
      if (ans) {
        let temp2 = {
          product_id: this.voucher['product_id'],
          status: !this.voucher.status,
        };
        this.http.post('https://hockwon.vsnap.my:3002/updateproduct', temp2).subscribe(a => {
          swal({
            icon: 'success',
            title: (this.voucher.status ? 'Deactivated' : 'Activated'),
            text: "Product" + (this.voucher.status ? 'Deactivated!' : 'Activated!'),
            buttons: [false],
            timer: 2000,
          })
          this.back();
        })
      }
    })
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        this.lang = data || 'en';
      })
    });

    this.actRoute.queryParams.subscribe(b => {
      this.http.post('https://hockwon.vsnap.my:3002/getproduct', { product_id: b.id }).subscribe(a => {
        this.voucher = a['data'];
        console.log(a);
        // this.locations = a['data'].map(a => a.name) || [];
        // delivery_courier : this.lengthof(this.selected_method.filter(a => a == 'Delivery (邮寄)')) ? true : false,
        // delivery_collect : this.lengthof(this.selected_method.filter(a => a == 'Self Collect (自取)')) ? true : false,
        // this.selected_method
        if (this.voucher['delivery_courier']) {

          this.selected_method.push('Delivery (邮寄)')

        }

        if (this.voucher['delivery_collect']) {

          this.selected_method.push('Self Collect (自取)')

        }

        console.log(this.selected_method)

      })
    })

    this.http.get('https://hockwon.vsnap.my:3002/get?tablename=locations').subscribe(a => {
      this.locations = a['data'].map(a => a.name) || [];
    })

    this.http.get('https://hockwon.vsnap.my:3002/getallcategories').subscribe(a => {
      console.log(a['data'])
      if(this.lang == 'en')
      {
        this.categories = (a['data'].filter(a => a['status'] == true) || []).map(a => a['name_en']);
      }
      else if(this.lang == 'zh')
      {
        this.categories = (a['data'].filter(a => a['status'] == true) || []).map(a => a['name_zh']);
      }
      
      console.log(this.categories)
    })
  }

  async variations(x, y) {
    const modal = await this.modalController.create({
      component: ProductVariationsPage,
      componentProps: { variation: x, data: y, }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.voucher.variations = data.value2;
      this.voucher.vardetail = data.value;
    }
  }

  async selectormany(x, y, z) {
    const modal = await this.modalController.create({
      component: SelectormanyPage,
      componentProps: { array: x, selected: (z || []) },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      eval(y + ' = data.value');
    }
  }

  async selector(x, y) {

    const modal = await this.modalController.create({
      component: SelectorPage,
      componentProps: { array: x }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      eval(y + ' = data.value');
    }
  }

  async linkers(x) {
    console.log(x);

    const modal = await this.modalController.create({
      component: ProductLinkPage,
      componentProps: { data: x }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);

      this.voucher.link = data.value;
    }
  }

  back() {
    this.nav.pop();
  }

  imagec
  imagectype
  base64img

  fileChange2(event, maxsize) {
    // if (this.vendor_acc["vendor_id"] == this.vendor_acc["id"]) {
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
          if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
            console.log(event.target.files[0].exifdata.Orientation);
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
          this.voucher.photo.push({
            url: 'https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif',
          });

          this.http.post('https://img.vsnap.my/upload', { image: this.imagec, folder: 'hockwong', userid: 'hockwongvendor' }).subscribe((link) => {
            this.voucher.photo[this.lengthof(this.voucher.photo) - 1]['url'] = link['imageURL']
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

  create() {

    console.log(this.voucher)
    console.log(this.selected_method)
    // console.log(['photo', 'name_zh', 'name_en', 'variations', 'category'].every(a => this.lengthof(this.voucher[a])) && this.lengthof(this.selected_method)
    //   && ['early', 'latest'].every(a => this.voucher.delivery_duration[a]));

    if (['photo', 'name_zh', 'name_en', 'variations', 'category'].every(a => this.lengthof(this.voucher[a])) && this.lengthof(this.selected_method)
      && ['early', 'latest'].every(a => this.voucher.delivery_duration[a])) {
      swal({
        icon: 'info',
        text: "This product will resubmit to admin to verify, are you sure?",
        title: "Product Resubmit",
        buttons: { Cancel: true, Confirm: true },
      }).then(a => {
        if (a == 'Confirm') {
          // let temp = JSON.parse(JSON.stringify(this.voucher));
          let temp2 = {
            name_zh: this.voucher['name_zh'] || '',
            name_en: this.voucher['name_en'] || '',
            description_zh: this.voucher['description_zh'] || '',
            description_en: this.voucher['description_en'] || '',
            thumbnail: this.voucher['photo'][0]['url'] || '',
            vendor_id: this.voucher['vendor_id'] || '',
            category: this.voucher['category'] || '',
            photo: JSON.stringify(this.voucher['photo']),
            link: JSON.stringify([]),
            delivery_duration: JSON.stringify(this.voucher['delivery_duration']),
            special_branch: JSON.stringify([]),
            recommender: this.voucher['recommender'] || false,
            delivery_principal: this.voucher['delivery_principal'] || false,
            delivery_courier: this.lengthof(this.selected_method.filter(a => a == 'Delivery (邮寄)')) ? true : false,
            delivery_collect: this.lengthof(this.selected_method.filter(a => a == 'Self Collect (自取)')) ? true : false,
            status: this.voucher['status'] || true,
            variations: JSON.stringify(this.variations),
            vardetail: JSON.stringify(this.voucher.vardetail),
            edit_status: 'edit',
            product_id: this.voucher['product_id']
          };
          // temp.delivery_courier = this.selected_method.some(a => a == 'Delivery (邮寄)');
          // temp.delivery_collect = this.selected_method.some(a => a == 'Self Collect (自取)')
          // temp.delivery_duration = JSON.stringify(this.voucher.delivery_duration);
          // temp.variations = JSON.stringify(this.voucher.variations);
          // temp.vardetail = JSON.stringify(this.voucher.vardetail);
          // temp.photo = JSON.stringify(this.voucher.photo);
          // temp.link = JSON.stringify(this.voucher.link || []);
          // temp.special_branch = JSON.stringify([]);
          // temp.edit_status = 'edit';
          // temp.thumbnail = this.voucher.photo[0]['url'];

          swal({
            title: "请稍等",
            text: "处理中",
            buttons: [false],
            closeOnEsc: false,
            closeOnClickOutside: false,
          })
          this.http.post('https://hockwon.vsnap.my:3002/updateproduct', temp2).subscribe(a => {
            swal({
              icon: 'success',
              title: 'Submitted',
              text: "提交成功！主管将会审核此商品",
              buttons: [false],
              timer: 2000,
            })
            this.back();
          })
        }
      })
    } else {
      swal({
        icon: 'error',
        title: 'Error',
        text: "请填写所有资料！",
        buttons: [false],
        timer: 2000,
      })
    }
    // swal
  }
}

