import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import swal from 'sweetalert';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import firebase from 'firebase';
import { BentoService } from '../bento.service';
import * as EXIF from 'exif-js';
import * as promiseAny from 'promise-any';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile-workshop',
  templateUrl: './profile-workshop.page.html',
  styleUrls: ['./profile-workshop.page.scss'],
})
export class ProfileWorkshopPage implements OnInit {

  focus;
  user = {} as any;
  category = [] as any;
  vendor = {} as any;
  openday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  language = {
    'Create Product': {
      cn: '添加产品',
      en: 'Product Create',
    }, 'Product Image': {
      cn: '产品照片',
      en: 'Product Image',
    }, 'Product Information': {
      cn: '产品详情',
      en: 'Product Information',
    }, 'User Information': {
      cn: '用户资料',
      en: 'User Information',
    }, 'Selling Price': {
      cn: '售卖价格',
      en: 'Selling Price',
    }, 'Car Plate': {
      cn: '车牌号码',
      en: 'Car Plate',
    }, 'Service Selection': {
      cn: '选择服务',
      en: 'Service Selection',
    }, 'Preview Quotation': {
      cn: '预览报价单',
      en: 'Preview Quotation',
    }, 'Remarks': {
      cn: '备注',
      en: 'Remarks',
    }, 'Feedback': {
      cn: '反馈',
      en: 'Feedback',
    }, 'Quantity': {
      cn: '数量',
      en: 'Quantity',
    }, 'Quotation Preview': {
      cn: '报价单预览',
      en: 'Quotation Preview',
    }, 'Quotation': {
      cn: '报价单',
      en: 'Quotation',
    }, 'Address': {
      cn: '地址',
      en: 'Address',
    }, 'Date': {
      cn: '日期',
      en: 'Date',
    }, 'New': {
      cn: '新',
      en: 'New',
    }, 'Invoice': {
      cn: '发票',
      en: 'Invoice',
    }, 'Status': {
      cn: '状况',
      en: 'Status',
    }, 'Due Date': {
      cn: '截止日期',
      en: 'Due Date',
    }, 'New User': {
      cn: '新用户',
      en: 'New User',
    }, 'Select Car': {
      cn: '选择用户',
      en: 'Select Car',
    }, 'Optional': {
      cn: '可选的',
      en: 'Optional',
    }, 'NEW CAR': {
      cn: '新车辆',
      en: 'NEW CAR',
    }, 'Create': {
      cn: '添加',
      en: 'Create',
    }, 'Cancel': {
      cn: '取消',
      en: 'Cancel',
    }, 'Services': {
      cn: '服务',
      en: 'Services',
    }, 'Products': {
      cn: '产品',
      en: 'Products',
    }, 'Name': {
      cn: '名字',
      en: 'Name',
    }, 'Qty': {
      cn: '数量',
      en: 'Qty',
    }, 'Price': {
      cn: '价钱',
      en: 'Price',
    }, 'Create New Product': {
      cn: '添加新产品',
      en: 'Create New Product',
    }, 'Others': {
      cn: '其他',
      en: 'Others',
    }, 'Sub-total': {
      cn: '小计',
      en: 'Sub-total',
    }, 'Discount': {
      cn: '折扣',
      en: 'Discount',
    }, 'Total': {
      cn: '总数',
      en: 'Total',
    }, 'Preview': {
      cn: '预览',
      en: 'Preview',
    }, 'Payment': {
      cn: '付款',
      en: 'Payment',
    }, 'Total Paid': {
      cn: '已付总额',
      en: 'Total Paid',
    }, 'Paid Type': {
      cn: '付款方式',
      en: 'Paid Type',
    }, 'Cash': {
      cn: '现金',
      en: 'Cash',
    }, 'Transfer': {
      cn: '转账',
      en: 'Transfer',
    }, 'Card': {
      cn: '信用卡',
      en: 'Card',
    }, 'Paid ID': {
      cn: '付款ID',
      en: 'Paid ID',
    }, 'Paid Remark': {
      cn: '付款备注',
      en: 'Paid Remark',
    }, 'Total Due': {
      cn: '欠数总额',
      en: 'Total Due',
    }, 'Send Quotation': {
      cn: '发送报价单',
      en: 'Send Quotation',
    }, 'Create Invoice': {
      cn: '添加发票',
      en: 'Create Invoice',
    }, 'Company Name': {
      cn: '公司名称',
      en: 'Company Name',
    }, 'Customer Information': {
      cn: '客户详情',
      en: 'Customer Information',
    }, 'Car Information': {
      cn: '车辆详情',
      en: 'Car Information',
    }, 'No': {
      cn: '数号',
      en: 'No',
    }, 'Service': {
      cn: '服务',
      en: 'Service',
    }, 'Product': {
      cn: '产品',
      en: 'Product',
    }, 'Unit': {
      cn: '单位',
      en: 'Unit',
    }, 'Edit': {
      cn: '修改',
      en: 'Edit',
    }, 'Contact Customer': {
      cn: '联系客户',
      en: 'Contact Customer',
    }, 'Selected Car': {
      cn: '已选择车辆',
      en: 'Selected Car',
    }, 'Create New': {
      cn: '添加新',
      en: 'Create New',
    }, 'Payment History': {
      cn: '付款历史',
      en: 'Payment History',
    }, 'Update': {
      cn: '更新',
      en: 'Update',
    }, 'Cancelled': {
      cn: '已取消',
      en: 'Cancelled',
    }, 'Car': {
      cn: '车',
      en: 'Car',
    }, 'Service Select': {
      cn: '选择服务',
      en: 'Service Select',
    }, 'Invoice list': {
      cn: '发票列表',
      en: 'Invoice list',
    }, 'Quotations': {
      cn: '报价单',
      en: 'Quotations',
    }, 'Unpaid': {
      cn: '未付款',
      en: 'Unpaid',
    }, 'Complete': {
      cn: '完成',
      en: 'Complete',
    }, 'Tel': {
      cn: '手机号',
      en: 'Tel',
    }, 'Services at': {
      cn: '服务在',
      en: 'Services at',
    }, 'By': {
      cn: '由',
      en: 'By',
    }, 'AMOUNT DUE': {
      cn: '欠款',
      en: 'AMOUNT DUE',
    }, 'Clear Bill': {
      cn: '清账',
      en: 'Clear Bill',
    }, 'Fully Paid': {
      cn: '已付全额',
      en: 'Fully Paid',
    }, 'Quotation request on': {
      cn: '报价单申请于',
      en: 'Quotation request on',
    }, 'Order Details': {
      cn: '订单详情',
      en: 'Order Details',
    }, 'Payment Details': {
      cn: '付款详情',
      en: 'Payment Details',
    }, 'Payment Type': {
      cn: '付款方式',
      en: 'Payment Type',
    }, 'Pay Total': {
      cn: '付款总额',
      en: 'Pay Total',
    }, 'Order Total': {
      cn: '订单总额',
      en: 'Order Total',
    }, 'Total Payment': {
      cn: '付款总额',
      en: 'Total Payment',
    }, 'Pay Now': {
      cn: '现在支付',
      en: 'Pay Now',
    }, 'Parts Creat': {
      cn: '添加零件',
      en: 'Parts Creat',
    }, 'Parts Image': {
      cn: '零件图片',
      en: 'Parts Image',
    }, 'Maximum 10 images to upload': {
      cn: '最多可上载10张',
      en: 'Maximum 10 images to upload',
    }, 'Parts Information': {
      cn: '零件详情',
      en: 'Parts Information',
    }, 'Category': {
      cn: '种类',
      en: 'Category',
    }, 'Description': {
      cn: '描述',
      en: 'Description',
    }, 'Create Parts': {
      cn: '添加零件',
      en: 'Create Parts',
    }, 'Merchant Setting': {
      cn: '企业设定',
      en: 'Merchant Setting',
    }, 'Merchant Photo': {
      cn: '企业图片',
      en: 'Merchant Photo',
    }, 'Postcode': {
      cn: '邮政编码',
      en: 'Postcode',
    }, 'State': {
      cn: '位置',
      en: 'State',
    }, 'Open At': {
      cn: '开业于',
      en: 'Open At',
    }, 'Close At': {
      cn: '休业于',
      en: 'Close At',
    }, 'Operating Day': {
      cn: '营业天数',
      en: 'Operating Day',
    }, 'Google Map GPS': {
      cn: '谷歌地图',
      en: 'Google Map GPS',
    }, 'Latitude': {
      cn: '纬度',
      en: 'Latitude',
    }, 'Get': {
      cn: '获取',
      en: 'Get',
    }, 'Longitude': {
      cn: '经度',
      en: 'Longitude',
    }, 'Invoice Head': {
      cn: '发票头',
      en: 'Invoice Head',
    }, 'Invoice Tail': {
      cn: '发票尾',
      en: 'Invoice Tail',
    }, 'Quotation Head': {
      cn: '报价单头',
      en: 'Quotation Head',
    }, 'Quotation Tail': {
      cn: '报价单尾',
      en: 'Quotation Tail',
    }
  }
  lang = 'en';

  selected = [] as any;

  constructor(private storage: Storage,
    private nav: NavController, private activatedrouted: ActivatedRoute, private bento: BentoService, public router: IonRouterOutlet,
    private http: HttpClient, private geolocation: Geolocation) { }

  getlocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.vendor.latitude = resp.coords.latitude
      this.vendor.longitude = resp.coords.longitude
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  pushorpull(x, i) {
    // console.log(this.lengthof(this.vendor.operation_day) > 0 ? this.vendor.operation_day.findIndex(a => a['name'] == x) : false);
    this.checkselect(x) ? this.vendor.operation_day.splice(this.vendor.operation_day.findIndex(a => a == x), 1) : (this.vendor.operation_day.push(x));
    // console.log(this.vendor.operation_day);
  }

  checkselect(x) {
    return this.vendor.operation_day ? this.lengthof((this.vendor.operation_day || []).filter(a => a == x)) ? true : false : false;
  }

  position = "";

  imagectype;
  imagec;
  base64img;

  fileChange(event, maxsize) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
      this.imagectype = event.target.files[0].type;
      EXIF.getData(event.target.files[0], () => {
        console.log(event.target.files[0]);
        console.log(event.target.files[0].exifdata.Orientation);
        const orientation = EXIF.getTag(this, 'Orientation');
        const can = document.createElement('canvas');
        const ctx = can.getContext('2d');
        const thisImage = new Image;

        const maxW = maxsize;
        const maxH = maxsize;
        thisImage.onload = (a) => {

          // console.log(a);
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
            // console.log(event.target.files[0].exifdata.Orientation);
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
          this.vendor.photo.push(
            { name: "https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif" }
          );
          let currenter = this.lengthof(JSON.parse(JSON.stringify(this.vendor.photo))) - 1

          const promises = [this.bento.uploadToImgur(this.base64img), this.bento.uploadToImgbb(this.base64img)];

          console.log(this.vendor.photo);

          promiseAny(promises).then((value) => {
            console.log(value);
            this.vendor.photo[currenter] = { name: value };
          });

          // this.uploadToImgur(this.base64img, this.photo.length - 1);
          //console.log(this.imagec)

        };
        thisImage.src = URL.createObjectURL(event.target.files[0]);
        // eval('this.'+el+'.nativeElement.value = null;')
      });
    } else {
      swal.close();
      alert('Your Current Image Too Large, ' + event.target.files[0].size / (10241024) + 'MB! (Please choose file lesser than 8MB)');
    }
  }

  deleteimage(code, i) {
    eval(code + '.splice(' + i + ',1);');
  }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        if (data == 'cn' || data == 'en') {
          this.lang = data;
        }
      })
    });

    firebase.database().ref('category').once('value', data => {
      this.category = data.val();
      console.log(this.category);
    })

    this.activatedrouted.queryParams.subscribe(a => {
      this.position = a['position'];
      this.user['name'] = a['name']
      this.user['phone'] = a['phone']
      this.user['email'] = a['email']
      this.user['id'] = a['id']
      this.user['photo'] = a['photo']
      this.user['position'] = a['position']


      if (this.user['position'] == 'Admin') {

        this.http.post('https://forcar.vsnap.my/accgetvendor', { id: this.user['id'] }).subscribe(v => {
          this.vendor = v['data']
          this.vendor.photo = JSON.parse(v['data'].photo)
          // this.vendor['operation_hour'] ? (this.vendor['operation_hour']) : this.vendor['operation_hour'] = { lower: '10pm', upper: '7am' }

          console.log(typeof (this.vendor['operation_day']));

          this.vendor['operation_day'] ? this.vendor['operation_day'] : this.vendor['operation_day'] = [] as any;

          console.log(this.vendor)

        })

      }
    })

  }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

  // numberOnlyValidation(event: any) {
  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  complete() {

    console.log(this.vendor)
    console.log(parseFloat(this.vendor['longitude']))

    swal({
      title: 'Confirmation',
      text: 'Confirm update profile?',
      icon: 'info',
      buttons: { Cancel: true, Confirm: true },
    }).then(a => {

      if (a == 'Confirm') {
        // this.completer = true;
        this.http.post('https://forcar.vsnap.my/updatevendoracc', {
          id: this.user['id'],
          name: this.user['name'],
          photo: this.user['photo']
        }).subscribe(f => {
          console.log(f)

          if (this.user['position'] == 'Admin') {

            console.log({
              id: this.vendor['id'],
              longitude: parseFloat(this.vendor['longitude']) || null,
              latitude: parseFloat(this.vendor['latitude']) || null,
              description: this.vendor['description'] || '',
              address: this.vendor['address'] || '',
              gps: this.vendor['gps'] || '',
            })

            this.http.post('https://forcar.vsnap.my/updatevendor', {
              id: this.vendor['id'],
              longitude: parseFloat(this.vendor['longitude']) || null,
              latitude: parseFloat(this.vendor['latitude']) || null,
              photo: JSON.stringify(this.vendor['photo'] || []),
              description: this.vendor['description'] || '',
              address: this.vendor['address'] || '',
              gps: this.vendor['gps'] || '',
              state: this.vendor.state || '',
              postcode: this.vendor.postcode || 0,
              category: this.vendor.category || '',
              invoice_head: this.vendor.invoice_head,
              invoice_tail: this.vendor.invoice_tail,
              quo_tail: this.vendor.quo_tail,
              quo_head: this.vendor.quo_head,
              operation_hour: JSON.stringify(this.vendor.operation_hour || {}),
              operation_day: JSON.stringify(this.vendor.operation_day || [])
            }).subscribe(v => {

              console.log(v)

              swal({
                title: 'Success',
                text: 'Update Proflie Successfully',
                icon: 'success',
                timer: 3000

              })
              firebase.database().ref('vendortrigger/' + firebase.auth().currentUser.uid).transaction(a => (a || 0) + 1);


              this.back();


            })
            // updatevendor

          } else {

            swal({
              title: 'Success',
              text: 'Update Proflie Successfully',
              icon: 'success',
              timer: 3000

            })

            this.back();

          }

        })
      }


    })



  }

}
