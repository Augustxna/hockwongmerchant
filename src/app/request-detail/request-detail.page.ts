import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert'; import firebase from 'firebase';;
import { IonInfiniteScroll, IonRouterOutlet, IonicSlides, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BentoService } from '../bento.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.page.html',
  styleUrls: ['./request-detail.page.scss'],
})
export class RequestDetailPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonicSlides;

  constructor(private nav: NavController, private http: HttpClient, private bento: BentoService, public router: IonRouterOutlet, private storage: Storage,
    private activatedrouted: ActivatedRoute, private datepipe: DatePipe) { }

  id;
  quotations = [] as any;
  users = [
    { name: "AAi", phone: "123123354", id: "yser01" },
    { name: "ABi", phone: "123123355", id: "yser02" },
    { name: "ACi", phone: "123123356", id: "yser03" },
    { name: "ADi", phone: "123123358", id: "yser04" },
  ]

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
    }, 'Please Dont Leave Empty': {
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
    }, 'Close': {
      cn: '关闭',
      en: 'Close',
    }
  }

  lang = 'en';
  user = { name: "", phone: "", id: "" }
  car = { brand: "", plate: "", color: "", model: "" }

  brands = ["Toyota", "Honda", "Lexus", "Proton", "Alpha Romeo", "Others"]
  colors = ["Red", "Blue", "Green", "Black", "Silver", "Others"]
  userkey = "";
  brandkey = "";
  colorkey = "";
  prodkey = "";
  newcar = false;
  product = [];
  categories = ["Service", "Product", "Tyre", "Lel"]
  subtotal = 0;
  discount = null;
  paid = null;

  paid_record = null
  paid_remark = null
  paid_type = 'cash'

  viewinvoice = false

  maxDate = (new Date().getFullYear() + 5).toString()

  close = false;
  nowphoto = [] as any;
  currentIndex

  checkslide(event) {
    this.slides.getActiveIndex().then((index: number) => {
      this.currentIndex = index;
    });
  }

  openpic(x, y) {
    this.nowphoto = x.map(a => a['name']);
    console.log(this.nowphoto);

    this.currentIndex = y;
    this.close = true;
    this.slides.slideTo(y, 10);
    this.close = true;
  }

  back() {
    // public router:IonRouterOutlet
    this.router.canGoBack() ? this.nav.pop() : this.nav.navigateBack('tabs/tab1')
  }

  chackinvoice() {

    if (this.lengthof(this.product) > 0 && this.quotations['invoice_id']) {

      this.viewinvoice = true

    } else {

      console.log('no')

    }

  }

  deal_date
  quotation = true;

  length = {} as any;

  vendor = {} as any;

  position = "";

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


      this.http.post('https://forcar.vsnap.my/getrequest', {
        request_id: a['id']
      }).subscribe(a => {
        console.log(a['data'])
        // this.request = a['data'][0];

        this.quotations = a['data'][0];
        console.log(123)
        console.log(this.quotations)
        this.deal_date = this.quotations.deal_date ? new Date(this.quotations.deal_date).toISOString() : new Date().toISOString();

        // this.product = this.quotations['products']
        // this.subtotal = this.product.reduce((a, b) => a + b['qty'] * b['price'], 0)



        // zzzzzzzzzzzzzzzzzzzzzzzz

        this.http.post('https://forcar.vsnap.my/accgetvendor', { id: this.quotations.vendorid }).subscribe(v => {
          this.vendor = v['data']
          console.log(v['data']);

          if (this.vendor.invoice_tail && this.vendor.invoice_head) {

            console.log(this.vendor.invoice_tail, this.length.orderlength)

            this.http.post('https://forcar.vsnap.my/selectvendorlength', { id: this.quotations.vendorid }).subscribe(p => {
              console.log(p['data']);
              this.length = p['data']

              let mid = "";

              for (let i = 0; i < (4 - ((((this.vendor.quo_tail || 0) + this.length.quotationlength + 1).toString()).length)); i++) {
                mid += "0"
              }

              this.quotations.quo_id = (this.vendor.quo_head || "QT") + mid + ((this.vendor.quo_tail || 0) + this.length.quotationlength + 1); // ++ invoice Number
            })



          }

          // this.quotations['vendorid'] = this.vendor['id']
        })


        this.http.post('https://forcar.vsnap.my/getvendorproduct', { id: this.quotations.vendorid }).subscribe(p => {
          this.products = p['data'].filter(a => a['status']);
          this.categories = ((this.products.map(a => (a['category']))).reduce((b, c) => (b.concat(c)), [])).reduce((a, b) => (a || []).every(c => c['name'] != b['name']) ? a.concat(b) : a, [])

          console.log(this.categories)

        })

      })

    })
  }

  lengthof(x) {
    return x ? Object.keys(x).length : 0
  }

  pushprod2(eve) {
    this.product.push({ name: JSON.parse(JSON.stringify(this.prodkey)), qty: 1, id: 'custom', category: "", price: 0 });
    this.prodkey = "";
    // this.subtotal = this.product.reduce((a, b) => a + b['qty'] * b['price'], 0)
  }

  updqty() {
    this.subtotal = this.product.reduce((a, b) => a + b['qty'] * b['price'], 0)
  }

  searchercat(x) {
    return (x || []).filter(a => (this.products || []).some(b => (b.category).some(c => c.name == a.name) && (((b.name || "") + (b['sku'] || "")
    ).toLowerCase()).includes(this.prodkey.toLowerCase()) && this.product.every(c => c.id != b.id)))
  }

  pushprod(eve) {

    this.product.push({ name: eve.name, qty: 1, id: eve.product_id, category: eve.category, price: eve.price || 0 });
    this.prodkey = "";
    this.subtotal = this.product.reduce((a, b) => a + (b['qty'] || 1) * b['price'], 0)

  }

  delprod(i) {
    this.product.splice(i, 1);
    this.subtotal = this.product.reduce((a, b) => a + b['qty'] * b['price'], 0)

  }

  searcherprod(x) {
    // (b.category).some(c => c.name == a.name) &&
    return (this.products || []).filter(a => (a.category).some(c => c.name == x.name) && (((a.name || "") + (a['sku'] || "")
    ).toLowerCase()).includes(this.prodkey.toLowerCase()) && this.product.every(c => c.id != a.id))
  }

  prodsel = { name: null, qty: null, price: null, id: null }

  products = [
    // { name: "Prod A", price: 10, id: 'proda', category: ["Service", "Product"] },
    // { name: "Prod B", price: 20, id: 'prodb', category: ["Service"] },
    // { name: "Prod C", price: 30, id: 'prodc', category: ["Service"] },
    // { name: "Prod D", price: 40, id: 'prodd', category: ["Product"] },
    // { name: "Prod E", price: 50, id: 'prode', category: ["Tyre"] },
  ] as any;

  clearuser() {
    this.user = { name: "", phone: "", id: "" };
  }

  clearbrand() {
    this.car.brand = "";
  }
  clearcolor() {
    this.car.color = "";
  }

  searcher(x) {
    return (x || []).filter(a => ((a.name).toLowerCase()).includes(this.userkey.toLowerCase()))
  }

  searcherbrand(x) {
    return (x || []).filter(a => ((a).toLowerCase()).includes(this.brandkey.toLowerCase()))
  }

  searchercolor(x) {
    return (x || []).filter(a => ((a).toLowerCase()).includes(this.colorkey.toLowerCase()))
  }


  // create() {

  //   // console.log(this.quotations)
  //   if (this.quotations.invoice_id && this.lengthof(this.product) > 0) {

  //     swal({
  //       buttons: [false],
  //       title: 'Creating ...',
  //       text: 'Thanks Your Patience',
  //       closeOnClickOutside: false,
  //       closeOnEsc: false,
  //     });

  //     let body = {
  //       quotation_id: this.quotations['quotation_id'],
  //       products: JSON.stringify(this.product || []),
  //       offer: this.quotations.offer,
  //       deal_date: new Date(this.deal_date).getTime(),
  //     }

  //     this.http.post('https://forcar.vsnap.my/updateorders', body).subscribe(v => {

  //       console.log(v)

  //       if (this.paid > 0) {

  //         let logs = {

  //           amount: this.paid,
  //           amount_actual: this.paid,
  //           date: new Date().getTime(),
  //           from_who: this.quotations['userid'],
  //           rate: 0,
  //           remark: 'Merchant get',
  //           to_who: this.quotations['vendorid'],
  //           type: this.paid_type || 'cash',
  //           orderid: this.quotations['quotation_id'],
  //           payment_remark: this.paid_remark || '',
  //           payment_id: this.paid_record || ''

  //         }

  //         this.http.post('https://forcar.vsnap.my/insertlogs', logs).subscribe(l => {

  //           if (l['message'] == 'Ok') {

  //             // alert('Create Success')

  //             swal.close()

  //             this.nav.pop()

  //             swal({
  //               title: 'Success',
  //               text: 'Invoice Create Success',
  //               icon: 'success',
  //               timer: 5000,
  //             });

  //           } else {

  //             swal.close()

  //             swal({
  //               title: 'Something Wrong',
  //               text: 'Please Try Again Later',
  //               icon: 'error',
  //               timer: 5000,
  //             });
  //             // alert('Somthing Wrong2')

  //           }

  //         })

  //       } else {

  //         swal.close()

  //         this.nav.pop()

  //         swal({
  //           title: 'Success',
  //           text: 'Invoice Create Success',
  //           icon: 'success',
  //           timer: 5000,
  //         });

  //       }



  //     })


  //   }


  // }

  cancel(x) {
    console.log(x);

    swal({
      title: 'Confirmation',
      text: 'Confirm Reject Request?',
      icon: 'info',
      buttons: { Cancel: true, Confirm: true },
    }).then(a => {
      if (a == 'Confirm') {
        let temp2 = {
          request_id: this.quotations.request_id,
          status: 'Reject',
          sent_date: new Date().getTime
        }

        this.http.post('https://forcar.vsnap.my/updaterequest', temp2).subscribe(f => {
          setTimeout(() => {
            firebase.database().ref('usertrigger/' + this.quotations['userid']).transaction(a => (a || 0) + 1);
            firebase.database().ref('vendortrigger/' + firebase.auth().currentUser.uid).transaction(a => (a || 0) + 1);
          }, 500);
          console.log(f)
          this.back();

          swal({
            icon: 'success',
            text: 'Request Rejected!',
            title: 'Succcess',
            buttons: [false],
            timer: 2000,
          })
          console.log(f)
        })

      }
    });

  }

  invremark = "";

  create(x) {
    console.log(x);


    if (this.lengthof(this.product) > 0 && this.quotations['quo_id']) {
      swal({
        title: 'Confirmation',
        text: 'Confirm send quotation?',
        icon: 'info',
        buttons: { Cancel: true, Confirm: true },
      }).then(a => {
        if (a == 'Confirm') {

          let temp = {
            car_color: this.quotations['car_color'],
            car_modal: this.quotations['car_modal'],
            car_plate: this.quotations['car_plate'],
            car_remark: this.quotations['car_remark'] || '',
            carid: this.quotations['carid'],
            car_year: this.quotations['car_year'],
            products: JSON.stringify(this.product || []),
            photo: JSON.stringify(this.quotations['photo'] || []),
            vendorid: this.quotations['vendorid'],
            userid: this.quotations['userid'],
            status: 'Complete',
            offer: this.discount || 0,
            buyer_name: this.quotations['buyer_name'],
            buyer_contact: this.quotations['buyer_contact'],
            date: new Date().getTime(),
            price: ((this.subtotal || 0) - (this.discount || 0)),
            quo_id: this.quotations['quo_id'],
            remark: this.invremark,
          }

          let temp2 = {
            request_id: this.quotations.request_id,
            status: 'Complete',
            sent_date: new Date().getTime,
          }

          this.http.post('https://forcar.vsnap.my/updaterequest', temp2).subscribe(f => {
            console.log(f)
          })

          this.http.post('https://forcar.vsnap.my/insertquotations', temp).subscribe(f => {
            setTimeout(() => {
              firebase.database().ref('usertrigger/' + this.quotations['userid']).transaction(a => (a || 0) + 1);
              firebase.database().ref('vendortrigger/' + firebase.auth().currentUser.uid).transaction(a => (a || 0) + 1);
            }, 500);
            console.log(f)

            let body2 = {
              title: 'Quotation' + " Received!",
              body: "You've received one(1)" + ' Quotation ' + "from workshop!",
              path: 'quotationlist?id=' + this.quotations['userid'] + '&userid=' + this.quotations['userid'],
              topic: this.quotations['userid'],
            }
            this.http.post('https://forcar.vsnap.my/fcmAny', body2).subscribe(data2 => {
              console.log(data2);
            }, e => {
              console.log(e);
            });

            this.back();

            swal({
              icon: 'success',
              text: 'Quotation sent',
              title: 'Succcess',
              buttons: [false],
              timer: 2000,
            })
          })
        }
      })
    } else {
      swal({
        icon: 'error',
        text: 'Pleasse fill in Quotation No and choose at least one(1) products to proceed.',
        title: 'Error',
        buttons: [false],
        timer: 2000,
      })
    }

  }


}