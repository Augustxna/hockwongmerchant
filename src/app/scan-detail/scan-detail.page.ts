import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import swal from 'sweetalert';
@Component({
  selector: 'app-scan-detail',
  templateUrl: './scan-detail.page.html',
  styleUrls: ['./scan-detail.page.scss'],
})
export class ScanDetailPage implements OnInit {

  name = 'NAME';
  car = [{
    name: 'Kelisa',
    plate: 'AEL 5125',
    color: '#000000',
  }, {
    name: 'Honda',
    plate: 'AEL 5125',
    color: '#531564',
  }]
  add = false;
  completer = false;
  selectedcar = [] as any;
  edit = false;
  invselect = 0;
  invselect2 = 0;
  orderlist = [] as any;
  date = new Date().getTime()

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
    }
  }
  lang = 'en';

  constructor(private storage: Storage, private platform: Platform, private nav: NavController, private actRoute: ActivatedRoute,
    private http: HttpClient, public router: IonRouterOutlet) { }

  addplate() {
    this.add = !this.add;
  }

  editor() {
    this.edit = !this.edit;
    if (!this.edit) {

      if (this.ori.name == this.user.name) {
        console.log('nothing changed');
      } else {
        this.ori.name = this.user.name

        swal({
          title: 'Confirmation',
          text: 'Confirm Update user name?',
          icon: 'info',
          buttons: { Cancel: true, Confirm: true },
        }).then(a => {
          if (a == 'Confirm') {
            // this.completer = true;

            this.http.post('https://forcar.vsnap.my/updatevendoruser', { no: this.user['no'], name: this.user['name'] }).subscribe(f => {

              console.log(f)
              swal({
                icon: "success",
                title: "Success",
                text: "Update Successfully",
                timer: 5000
              })

            })
          }
        })
        console.log('changed');
        // update user nickname
      }
      console.log(this.edit);
    }
  }

  platechecker() {
    return true;
  }

  chekin = [] as any;
  appointmentlist = [] as any;
  user = [] as any;
  position = "";

  cardetail(x) {
    this.nav.navigateForward('checkin-detail?id=' + x + "&position=" + this.position)
    // this.nav.navigateForward('checkin-detail');
  }


  checkcreate(x) {
    console.log(x)
    this.nav.navigateForward('checkin-create?id=' + this.userid + '&vendorid=' + this.vendorid + '&carid=' + x + "&position=" + this.position);
  }

  vendorid;
  userid;
  ori = [] as any;

  quotations = [] as any

  stats = {
    ["In House"]: "Checked-in",
    ["Process"]: "Processing",
    ["Complete"]: "Ready",
    ["Checkout"]: "Checked-out",
  }

  checkerer(x) {
    if (this.lengthof((this.chekin || []).filter(a => a.carid == x.car_id)) > 0) {

      // console.log(((this.chekin||[]).filter(a=>a.carid == x.car_id)));
      return ((this.chekin || []).filter(a => a.carid == x.car_id))[0].status != "Checkout" ? { status: ((this.chekin || []).filter(a => a.carid == x.car_id))[0].status, color: "green", check_id: ((this.chekin || []).filter(a => a.carid == x.car_id))[0]['check_id'] } : { status: "", color: "#eeeeee" }

    } else {
      return { status: "", color: "#eeeeee" }
    }
  }

  cars = [];

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
      this.userid = a['id']
      this.vendorid = a['vendorid']
      // vendorid
      // userid
      this.http.post('https://forcar.vsnap.my/selectuserwcheckin', {
        userid: a['id'],
        vendorid: a['vendorid'],
      }).subscribe(b => {
        this.chekin = b['data'].filter(a => a['status'] != 'Checkout');
        console.log(this.chekin)
      })



      this.http.post('https://forcar.vsnap.my/getusercar', {
        id: a['id'],
      }).subscribe(f => {
        this.cars = f['data'] || [];

        console.log(this.cars)
      })

      // this.http.post('https://forcar.vsnap.my/selectuserwappointment', {
      //   userid: a['id'],
      //   vendorid: a['vendorid']
      // }).subscribe(f => {
      //   this.appointmentlist = f['data'].filter(a => a['appointment_date'] > new Date().getTime());
      // })

      // this.http.post('https://forcar.vsnap.my/selectuserworders', {
      //   userid: a['id'],
      //   vendorid: a['vendorid']
      // }).subscribe(f => {
      //   this.orderlist = f['data'].filter(a => a['total_recieve'] < a['price']);

      //   console.log(this.orderlist)
      // })


      console.log(a['id'], a['vendorid'])

      this.http.post('https://forcar.vsnap.my/getvendoruserdetail', { userid: a['id'], vendorid: a['vendorid'] }).subscribe(f => {
        console.log(f['data']['user'])
        this.user = f['data']['user'];

        if (f['data']['invoice']) {
          this.orderlist = f['data']['invoice'].filter(a => a['total_recieve'] < a['price']);
        }
        if (f['data']['app']) {
          this.appointmentlist = f['data']['app'].filter(a => a['appointment_date'] > new Date().getTime());
        }
        if (f['data']['quo']) {
          this.quotations = f['data']['quo'].filter(a => a['checker'] == false)
        }
        this.ori = JSON.parse(JSON.stringify(f['data']['user']));
      })

      // this.http.post('https://forcar.vsnap.my/selectpendingorders', {
      //   id: a['id']
      // }).subscribe(v => {
      //   console.log(v['data'])
      //   this.orderlist = v['data']
      // })
    })

  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0;
  }

  detail(x) {
    this.selectedcar = x;
    this.completer = true;
  }

  invoice(x) {
    this.nav.navigateForward('invoice-detail?id=' + this.userid + '&now=3' + '&position=' + this.position)
  }

  addinvoice() {
    this.nav.navigateForward('invoice-create?id=' + this.userid + '&position=' + this.position)
  }

  rounder(x) {
    return Math.floor(x);
  }

  widtherget() {
    return this.platform.width();
  }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

  apptcreate() {
    this.nav.navigateForward('appointment-create?id=' + this.vendorid + '&userid=' + this.userid + '&position=' + this.position);
  }

  goionvoicedetail(x) {

    this.nav.navigateForward('invoice-detail?id=' + x.quotation_id + '&position=' + this.position)

  }

  appointment(x) {
    this.nav.navigateForward('appointment-detail?id=' + x.appointment_id + '&position=' + this.position)
  }

  goquodetail(x) {
    // console.log(x)
    this.nav.navigateForward('invoice-detail?id=' + x.quotation_id + '&now=3&position=' + this.position)

  }

}
