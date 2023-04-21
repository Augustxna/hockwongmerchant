import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, NavController } from '@ionic/angular';
import swal from 'sweetalert'; import firebase from 'firebase';;
import { BentoService } from '../bento.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  constructor(private nav: NavController, private bento: BentoService, public router: IonRouterOutlet, private safariViewController: SafariViewController,
    private activatedrouted: ActivatedRoute, private http: HttpClient, private alertController: AlertController, private storage: Storage,) { }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

  id
  order = {}

  logs = []

  position = "";

  // tab = false
  lang = 'en';
  language = {
    'User Phone': {
      cn: '用户手机',
      en: 'User Phone',
    }, 'Create Quotation': {
      cn: '添加报价单',
      en: 'Create Quotation',
    }, 'Search Client': {
      cn: '查找客户',
      en: 'Search Client',
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
    }
  }

  pretext = 'Your Forcar account is created! Please use your phone number and password(forcar123) to login!'

  condis(x) {
    if (((x || '').toString()).substring(0, 1) == '+') {
      return x.substring(1, x.length)
    } else if (((x || '').toString()).substring(0, 1) == '6') {
      return x
    } else if (((x || '').toString()).substring(0, 1) == '0') {
      return '6' + x
    } else {
      return '60' + x
    }
  }

  whatsapp(x) {
    // let holder = JSON.parse(JSON.stringify(x)).substring(0, 4) == "http" ? x : "https://" + x
    let holder = 'https://wa.me/' + this.condis(x) + this.pretext;
    this.safariViewController.isAvailable()
      .then((available: boolean) => {
        if (available) {
          this.safariViewController.show({
            url: holder,
            transition: 'curl',
            enterReaderModeIfAvailable: true,
          })
            .subscribe((result: any) => {
              if (result.event === 'opened') console.log('Opened');
              else if (result.event === 'loaded') console.log('Loaded');
              else if (result.event === 'closed') console.log('Closed');
            },
              (error: any) => window.open(holder)
            );
        } else {
          window.open(holder);
        }
      }
      ).catch(a => {
        window.open(holder);
      });
  }


  ngOnInit() {

    this.storage.create().then(() => {
      this.storage.get('lang').then(data => {
        if (data == 'cn' || data == 'en') {
          this.lang = data;
        }
      })
    });

    this.activatedrouted.queryParams.subscribe(a => {
      this.position = a['position'];
      this.id = a.id
      console.log(this.id)

      this.http.post('https://forcar.vsnap.my/selectorders', {
        quotation_id: this.id
      }).subscribe(f => {


        this.order = f['data']
        console.log(this.order)

      })

      this.http.post('https://forcar.vsnap.my/selectorderlogs', {
        quotation_id: this.id
      }).subscribe(f => {


        this.logs = f['data']
        console.log(this.logs)

      })

    })
  }

  // payment() {
  //   this.nav.navigateForward('order-payment');
  // }

  returntotal() {

    return this.logs ? this.logs.reduce((a: number, b: number) => (a + b['amount']), 0) : 0

  }

  async payment() {

    if ((this.order['price'] - this.returntotal()) > 0) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Temporary Scan',
        inputs: [
          {
            name: 'name1',
            type: 'number',
            placeholder: 'payment'
          },
          {
            name: 'name2',
            type: 'text',
            placeholder: 'remark'
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
            handler: (a) => {
              // console.log('Confirm Ok');
              // console.log(a['name1'])

              this.http.post('https://forcar.vsnap.my/insertlogs', {
                // carplate : a['name1'],
                amount: a['name1'],
                amount_actual: a['name1'],
                date: new Date().getTime(),
                from_who: this.order['userid'],
                rate: 0,
                remark: a['name2'],
                to_who: this.order['vendorid'],
                type: 'cash',
                carid: this.order['carid'],
                orderid: this.order['quotation_id']
              }).subscribe(f => {
                firebase.database().ref('vendortrigger/' + firebase.auth().currentUser.uid).transaction(a => (a || 0) + 1);

                // console.log('Confirm')
                console.log(f['data'])


              })

            }
          }
        ]
      });

      await alert.present();

    } else {

      swal({

        icon: 'error',
        title: 'Fully Paid',
        text: 'The order has complete payment',
        timer: 2000,
        buttons: [false]

      })

    }


  }

}
