import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
})
export class RequestListPage implements OnInit {

  constructor(public nav: NavController, private http: HttpClient, public router: IonRouterOutlet, private storage: Storage,
    public actRoute: ActivatedRoute) { }
  request = [] as any;
  complete = [] as any;

  now = 0
  language = {
    'Services Requests': {
      cn: '服务请求',
      en: 'Services Requests',
    }, 'Requested on': {
      cn: '请求于',
      en: 'Requested on',
    }, 'Complete': {
      cn: '完成',
      en: 'Complete',
    }, 'User Information': {
      cn: '用户资料',
      en: 'User Information',
    }, 'User Name': {
      cn: '用户名称',
      en: 'User Name',
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
    }, 'Reply Quotation': {
      cn: '回复报价单',
      en: 'Reply Quotation',
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
    }, 'Please Don\'t Leave Empty': {
      cn: '请勿留空',
      en: 'Please Don\'t Leave Empty',
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
    }, 'Request Date': {
      cn: '申请日期',
      en: 'Request Date',
    }, 'Car Photo': {
      cn: '车辆图片',
      en: 'Car Photo',
    }, 'No photo': {
      cn: '没有图片',
      en: 'No photo',
    }, 'Selected Car': {
      cn: '已选择车辆',
      en: 'Selected Car',
    }, 'Services Request': {
      cn: '服务请求',
      en: 'Services Request',
    }, 'User Remark': {
      cn: '用户备注',
      en: 'User Remark',
    }, 'Cancel Request': {
      cn: '取消请求',
      en: 'Cancel Request',
    }
  }
  lang = 'en';
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

    })

    firebase.auth().onAuthStateChanged(a => {
      if (a) {
        this.http.post('https://forcar.vsnap.my/getvendorrequest', {
          id: a.uid
        }).subscribe(q => {
          console.log(q['data'])
          this.request = q['data'].filter(a => a['status'] == 'Pending')
          this.complete = q['data'].filter(a => a['status'] == 'Complete')
        })
      }

    })

  }

  position = '';

  requestdetail(x) {
    this.nav.navigateForward('request-detail?id=' + x + '&position=' + this.position)
  }


  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

}
