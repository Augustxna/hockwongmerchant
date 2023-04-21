import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import * as EXIF from 'exif-js';
import swal from 'sweetalert';
import { BentoService } from '../bento.service';
import * as promiseAny from 'promise-any';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.page.html',
  styleUrls: ['./staff-create.page.scss'],
})
export class StaffCreatePage implements OnInit {

  staff = [] as any;
  id;

  constructor(private nav: NavController, private storage: Storage,
    private bento: BentoService, private actRoute: ActivatedRoute, private http: HttpClient, public router: IonRouterOutlet) { }

  ngOnInit() {
    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        if (data == 'cn' || data == 'en') {
          this.lang = data;
        }
      })
    });
    this.actRoute.queryParams.subscribe(a => {
      this.position = a['position'];
      this.id = a['id']
    })
  }

  language = {
    'Staff Details': {
      cn: '职员详情',
      en: 'Staff Details',
    }, 'Admin': {
      cn: '管理层',
      en: 'Admin',
    }, 'Member': {
      cn: '员工',
      en: 'Member',
    }, 'Create Staff': {
      cn: '添加员工',
      en: 'Create Staff',
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
    }, 'Cars': {
      cn: '车辆',
      en: 'Cars',
    }, 'Add Car': {
      cn: '添加车辆',
      en: 'Add Car',
    }, 'Add Invoice': {
      cn: '添加发票',
      en: 'Add Invoice',
    }, 'Appointments': {
      cn: '预约',
      en: 'Appointments',
    }, 'Add Appointment': {
      cn: '添加预约',
      en: 'Add Appointment',
    }, 'Activities': {
      cn: '活动',
      en: 'Activities',
    }, 'Car Check In': {
      cn: '签到车辆',
      en: 'Car Check In',
    }, 'WhatsApp Merchant Now': {
      cn: '现在 WhatsApp 商家',
      en: 'WhatsApp Merchant Now',
    }, 'Merchant': {
      cn: '商家',
      en: 'Merchant',
    }, 'Contact Number': {
      cn: '联络号码',
      en: 'Contact Number',
    }
  }
  lang = 'en';
  position = "";

  imagectype;
  imagec;
  base64img;

  fileChange(event, maxsize) {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < (10485768)) {
      this.imagectype = event.target.files[0].type;
      // EXIF.getData(event.target.files[0], () => {
      console.log(event.target.files[0]);
      // console.log(event.target.files[0].exifdata.Orientation);
      // const orientation = EXIF.getTag(this, 'Orientation');
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
        // if (event.target.files[0] && event.target.files[0].exifdata.Orientation) {
        //   //  console.log(event.target.files[0].exifdata.Orientation);
        //   if (event.target.files[0].exifdata.Orientation > 4) {
        //     can.width = height; can.style.width = styleHeight;
        //     can.height = width; can.style.height = styleWidth;
        //   }
        //   switch (event.target.files[0].exifdata.Orientation) {
        //     case 2: ctx.translate(width, 0); ctx.scale(-1, 1); break;
        //     case 3: ctx.translate(width, height); ctx.rotate(Math.PI); break;
        //     case 4: ctx.translate(0, height); ctx.scale(1, -1); break;
        //     case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
        //     case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -height); break;
        //     case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(width, -height); ctx.scale(-1, 1); break;
        //     case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-width, 0); break;
        //   }
        // }

        ctx.drawImage(thisImage, 0, 0, iwScaled, ihScaled);
        ctx.restore();

        this.imagec = can.toDataURL();

        const imgggg = this.imagec.replace(';base64,', 'thisisathingtoreplace;');
        const imgarr = imgggg.split('thisisathingtoreplace;');
        this.base64img = imgarr[1];
        event.target.value = '';

        this.staff.photo = "https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif"
        // let currenter = this.lengthof(JSON.parse(JSON.stringify(this.photo))) - 1
        const promises = [this.bento.uploadToImgur(this.base64img), this.bento.uploadToImgbb(this.base64img)];

        promiseAny(promises).then((value) => {
          console.log(value);
          this.staff.photo = value;
        });

        // this.uploadToImgur(this.base64img, this.photo.length - 1);
        //console.log(this.imagec)

      };
      thisImage.src = URL.createObjectURL(event.target.files[0]);
      // eval('this.'+el+'.nativeElement.value = null;')
      // });
    } else {
      swal.close();
      alert('Your Current Image Too Large, ' + event.target.files[0].size / (10241024) + 'MB! (Please choose file lesser than 8MB)');
    }
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }
  //xxx check photo
  create() {
    if (['name', 'position', 'phone', 'email', 'password'].every(a => this.staff[a]) && this.staff.password.length >= 6) {
      swal({
        text: 'Please Wait...',
        title: 'Processing...',
        buttons: [false],
        closeOnEsc: false,
        closeOnClickOutside: false,
      })

      // firebase.auth().createUserWithEmailAndPassword(this.staff.email, this.staff.password).then(user => {
      console.log('CAN');

      let temp = {
        date: new Date().getTime(),
        email: this.staff.email,

        name: this.staff.name,
        password: this.staff.password,
        phone: this.staff.phone,
        photo: this.staff.photo || '',
        position: this.staff.position,
        status: true,
        vendorid: this.id,
      }

      this.http.post('https://forcar.vsnap.my/insertvendoracc', temp).subscribe(f => {
        console.log(f);

        if (f['message'].toLowerCase() != 'OK'.toLowerCase()) {


          swal.close()
          swal({
            icon: 'error',
            text: 'Somthing Wrong',
            title: 'Error',
            buttons: [false],
            timer: 2000,
          })

        } else {
          swal.close()
          firebase.database().ref('vendortrigger/' + firebase.auth().currentUser.uid).transaction(a => (a || 0) + 1);;
          swal({
            icon: 'success',
            text: 'New Staff created',
            title: 'Succcess',
            buttons: [false],
            timer: 2000,
          })
          this.back();
        }


      })

      // }).catch(e => {
      //   console.log(e);

      //   swal({
      //     icon: 'error',
      //     text: e.message,
      //     title: 'Error',
      //     buttons: [false],
      //     timer: 2000,
      //   })

      //   console.log('GG');

      // })
    } else {
      swal({
        icon: 'error',
        text: 'Please fill up all information',
        title: 'Error',
        buttons: [false],
        timer: 2000,
      })
    }

  }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

}
